import mammoth from 'mammoth';

export class DocumentParserService {
  /**
   * Cleans and sanitizes raw text by removing binary artifacts, unprintable control characters,
   * Unicode replacement characters, and compressed byte sequences.
   */
  static sanitizeText(text: string): string {
    if (!text) return '';

    // Remove control characters (except newline, tab, carriage return)
    let cleaned = text
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFFD\uFEFF]/g, ' ')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n');

    // Remove raw ZIP / PK header artifacts if any leaked through
    cleaned = cleaned
      .replace(/PK[\x00-\x09\x10-\x1F\x7F-\xFF]+[^\n]*/gi, '')
      .replace(/word\/(?:document|fontTable|styles|settings)\.xml[^\n]*/gi, '')
      .replace(/\[Content_Types\]\.xml[^\n]*/gi, '')
      .replace(/_rels\/\.rels[^\n]*/gi, '');

    // Normalize multiple spaces and blank lines
    cleaned = cleaned
      .split('\n')
      .map(line => line.trim())
      .filter(line => {
        if (!line) return false;
        // Filter out binary noise lines: if >35% of characters are non-alphanumeric/non-punctuation, discard line
        const alphaNumCount = (line.match(/[a-zA-Z0-9\s.,;:'"?!()\-_/]/g) || []).length;
        return (alphaNumCount / line.length) >= 0.65 && line.length >= 5;
      })
      .join('\n');

    return cleaned.trim();
  }

  /**
   * Parse any uploaded file (Word .docx, PDF, Plain Text .txt/.md/.json) into clean, plain requirements text.
   */
  static async parseFile(file: File): Promise<string> {
    const fileName = file.name.toLowerCase();

    // 1. Handle Microsoft Word (.docx) documents
    if (fileName.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value || '';
        return this.sanitizeText(text);
      } catch (err) {
        console.error('Failed to parse .docx using mammoth:', err);
        throw new Error('Could not parse Word document. Please ensure it is a valid .docx file.');
      }
    }

    // 2. Handle PDF documents
    if (fileName.endsWith('.pdf') || file.type === 'application/pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const textDecoder = new TextDecoder('utf-8', { fatal: false });
        const rawPdfString = textDecoder.decode(arrayBuffer);

        // Extract text tokens within parentheses (BT ... ET blocks) common in PDF stream structures
        const textMatches: string[] = [];
        const streamRegex = /\(([^)]+)\)\s*Tj/g;
        let match;
        while ((match = streamRegex.exec(rawPdfString)) !== null) {
          if (match[1] && match[1].length > 2) {
            textMatches.push(match[1]);
          }
        }

        if (textMatches.length > 0) {
          return this.sanitizeText(textMatches.join(' '));
        }

        // Fallback: extract printable ASCII substrings of length > 6
        const printableMatches = rawPdfString.match(/[a-zA-Z0-9\s.,;:'"?!()\-_/]{8,}/g) || [];
        return this.sanitizeText(printableMatches.join('\n'));
      } catch (err) {
        console.error('Failed to parse PDF:', err);
        throw new Error('Could not extract text from PDF.');
      }
    }

    // 3. Handle Plain Text, Markdown, CSV, JSON (.txt, .md, .csv, .json)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const rawContent = (e.target?.result as string) || '';
        resolve(this.sanitizeText(rawContent));
      };
      reader.onerror = () => reject(new Error('Failed to read text file.'));
      reader.readAsText(file);
    });
  }
}

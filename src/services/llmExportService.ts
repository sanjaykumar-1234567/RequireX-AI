import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import saveAs from 'file-saver';
import { BenchmarkRun, ModelEvaluationResult } from '../types/llmEvaluation';
import { EVALUATION_TASKS_CONFIG } from './llmGroundTruthService';

export class LLMExportService {
  static exportBenchmarkPDF(run: BenchmarkRun): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPos = 20;

    const checkPageBreak = (neededHeight: number = 20) => {
      if (yPos + neededHeight >= 280) {
        doc.addPage();
        yPos = 20;
      }
    };

    // Document Header
    doc.setFillColor(11, 11, 15);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(0, 240, 255);
    doc.text('RequireX AI — LLM Model Evaluation Lab', 14, 18);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 200, 220);
    doc.text(`Software Requirements Engineering Benchmark Report • ${run.domain} Domain`, 14, 26);
    doc.text(`Run ID: ${run.id} | Timestamp: ${run.timestamp} | Mode: ${run.isDemoMode ? 'Demo / Mock Benchmark' : 'Live API Connected'}`, 14, 32);

    yPos = 50;

    // Executive Summary
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 60);
    doc.text('1. Executive Benchmark Summary', 14, yPos);
    yPos += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(60, 60, 80);
    const summaryLines = doc.splitTextToSize(
      `This benchmark evaluates ${run.modelsTested.length} Large Language Models across ${run.tasksRun.length} Software Requirements Engineering (RE) tasks for the ${run.domain} domain. Every model received identical standardized prompt inputs and evaluation rubrics. Overall top-ranked model for this benchmark is ${run.results[run.topModelId]?.modelName} with a score of ${run.results[run.topModelId]?.overallScore}/100.`,
      pageWidth - 28
    );
    doc.text(summaryLines, 14, yPos);
    yPos += summaryLines.length * 5 + 6;

    // Overall Leaderboard Table
    checkPageBreak(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 60);
    doc.text('2. Model Performance Leaderboard', 14, yPos);
    yPos += 7;

    // Table Header
    doc.setFillColor(240, 244, 255);
    doc.rect(14, yPos, pageWidth - 28, 7, 'F');
    doc.setFontSize(8.5);
    doc.setTextColor(40, 50, 100);
    doc.text('Rank', 16, yPos + 5);
    doc.text('Model Name', 30, yPos + 5);
    doc.text('Provider', 80, yPos + 5);
    doc.text('RequireX Score', 115, yPos + 5);
    doc.text('Latency (ms)', 148, yPos + 5);
    doc.text('JSON Reliability', 172, yPos + 5);
    yPos += 8;

    // Table Rows
    const sorted = Object.values(run.results).sort((a, b) => b.overallScore - a.overallScore);
    sorted.forEach((res, idx) => {
      checkPageBreak(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 70);
      doc.text(`#${idx + 1}`, 16, yPos + 4);
      doc.setFont('helvetica', 'bold');
      doc.text(res.modelName, 30, yPos + 4);
      doc.setFont('helvetica', 'normal');
      doc.text(res.provider, 80, yPos + 4);
      doc.text(`${res.overallScore}/100`, 115, yPos + 4);
      doc.text(`${res.avgLatencyMs} ms`, 148, yPos + 4);
      doc.text(`${res.structuredReliabilityRate}%`, 172, yPos + 4);
      yPos += 6.5;
    });

    yPos += 6;

    // Task-by-Task Breakdown
    checkPageBreak(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 60);
    doc.text('3. Task-by-Task Performance Scores', 14, yPos);
    yPos += 8;

    run.tasksRun.forEach(taskId => {
      checkPageBreak(14);
      const meta = EVALUATION_TASKS_CONFIG.find(t => t.id === taskId);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(40, 40, 80);
      doc.text(`• ${meta?.label || taskId}:`, 16, yPos);
      
      const scoresText = sorted.map(s => `${s.modelName}: ${s.taskOutputs[taskId]?.score || 0}%`).join('  |  ');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(80, 80, 90);
      doc.text(scoresText, 20, yPos + 4.5);
      yPos += 9;
    });

    yPos += 6;

    // RequireX Engineering Recommendations
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 60);
    doc.text('4. RequireX Engineering Recommendations', 14, yPos);
    yPos += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60, 60, 80);
    const recText1 = `• Best for Requirements Analysis & Extraction: ${run.recommendationSummary.recommendedForAnalysis.modelName} (${run.recommendationSummary.recommendedForAnalysis.reason})`;
    const recText2 = `• Best for QA Test Matrix & Verification: ${run.recommendationSummary.recommendedForTesting.modelName} (${run.recommendationSummary.recommendedForTesting.reason})`;
    const recText3 = `• Best for Cost Efficiency & CI/CD: ${run.recommendationSummary.recommendedForCost.modelName} (${run.recommendationSummary.recommendedForCost.reason})`;
    
    [recText1, recText2, recText3].forEach(t => {
      checkPageBreak(12);
      const lines = doc.splitTextToSize(t, pageWidth - 28);
      doc.text(lines, 14, yPos);
      yPos += lines.length * 4.5 + 3;
    });

    // Methodology & Academic Limitations
    checkPageBreak(35);
    yPos += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 60);
    doc.text('5. Academic Methodology & Experiment Limitations', 14, yPos);
    yPos += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 120);
    const limitationLines = doc.splitTextToSize(
      'Note: This benchmark provides empirical evaluation specifically for Software Requirements Engineering tasks under standardized prompt templates. Performance may vary depending on domain complexity, prompt phrasing, and model version updates. Scores represent relative ranking within the RequireX evaluation suite.',
      pageWidth - 28
    );
    doc.text(limitationLines, 14, yPos);

    doc.save(`RequireX_LLM_Benchmark_${run.domain.replace(/\s+/g, '_')}_${run.id}.pdf`);
  }

  static exportBenchmarkDOCX(run: BenchmarkRun): void {
    const sorted = Object.values(run.results).sort((a, b) => b.overallScore - a.overallScore);

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: 'RequireX AI — LLM Model Evaluation Report',
            heading: HeadingLevel.TITLE
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Domain: ${run.domain} | Benchmark ID: ${run.id}\n`, bold: true }),
              new TextRun({ text: `Generated on: ${run.timestamp}\n\n` })
            ]
          }),
          new Paragraph({
            text: '1. Executive Summary',
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: `This report evaluates ${run.modelsTested.length} Large Language Models across ${run.tasksRun.length} Software Requirements Engineering tasks for ${run.domain}. Overall top-ranked model is ${run.results[run.topModelId]?.modelName} with a score of ${run.results[run.topModelId]?.overallScore}/100.`
          }),
          new Paragraph({
            text: '2. Model Rankings & Performance',
            heading: HeadingLevel.HEADING_1
          }),
          ...sorted.map((res, idx) => new Paragraph({
            children: [
              new TextRun({ text: `#${idx + 1} ${res.modelName} (${res.provider}) — Score: ${res.overallScore}/100\n`, bold: true }),
              new TextRun({ text: `Avg Latency: ${res.avgLatencyMs} ms | JSON Reliability: ${res.structuredReliabilityRate}% | Estimated Cost: $${res.totalCostUsd}\n` }),
              new TextRun({ text: `Strengths: ${res.strengths.join('; ')}\n\n` })
            ]
          })),
          new Paragraph({
            text: '3. RequireX Recommendations',
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: `Analysis: ${run.recommendationSummary.recommendedForAnalysis.modelName} — ${run.recommendationSummary.recommendedForAnalysis.reason}`
          }),
          new Paragraph({
            text: `Testing: ${run.recommendationSummary.recommendedForTesting.modelName} — ${run.recommendationSummary.recommendedForTesting.reason}`
          }),
          new Paragraph({
            text: `Cost Value: ${run.recommendationSummary.recommendedForCost.modelName} — ${run.recommendationSummary.recommendedForCost.reason}`
          })
        ]
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `RequireX_LLM_Benchmark_${run.domain.replace(/\s+/g, '_')}_${run.id}.docx`);
    });
  }

  static exportBenchmarkCSV(run: BenchmarkRun): void {
    const sorted = Object.values(run.results).sort((a, b) => b.overallScore - a.overallScore);
    const headers = ['Model', 'Provider', 'Overall Score', 'Latency (ms)', 'JSON Reliability (%)', 'Estimated Cost ($)', ...run.tasksRun];
    
    const rows = sorted.map(res => {
      const taskScores = run.tasksRun.map(t => res.taskOutputs[t]?.score || 0);
      return [
        `"${res.modelName}"`,
        `"${res.provider}"`,
        res.overallScore,
        res.avgLatencyMs,
        res.structuredReliabilityRate,
        res.totalCostUsd,
        ...taskScores
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `RequireX_LLM_Benchmark_${run.domain.replace(/\s+/g, '_')}_${run.id}.csv`);
  }
}

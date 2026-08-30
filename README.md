# RequireX - AI-Powered Requirements Engineering Suite & LLM Evaluation Lab

RequireX is a full-stack, enterprise-grade AI Requirements Engineering Assistant designed for Software Engineers, Business Analysts, Project Managers, and Academic Researchers. It automates the Software Requirements Engineering lifecycle using Large Language Model (LLM) intelligence, transforming raw stakeholder notes into publication-ready IEEE 830-1998 / 29148-2018 Software Requirement Specifications (SRS).

---

## 🧠 Major Innovation: LLM Model Evaluation Lab

RequireX includes a dedicated academic and experimental benchmarking suite: the **LLM Evaluation Lab**.

The purpose of this module is to empirically compare how different Large Language Models (LLMs) perform specifically on **Software Requirements Engineering (RE)** tasks, rather than generic conversational benchmarks.

### Evaluated RE Competencies (13 Tasks):
1. **Requirement Extraction**: Atomic requirement identification vs. Ground-Truth (Precision, Recall, F1).
2. **FR / NFR Multiclass Classification**: Interactive Confusion Matrix across Functional, Non-functional, Business, System, User, and Technical requirements.
3. **Ambiguity Detection**: Identification of non-verifiable words (*quickly, robust, secure*) and IEEE 830 measurable clarification rewrites.
4. **Missing Requirement Discovery**: Identification of omitted domain features (e.g. refund gates, offline sync, exception fallbacks).
5. **ISO/IEC/IEEE 29148 Completeness Analysis**: Verification of boundary conditions, quantifiable metrics, actors, and error states.
6. **Conflict & Inconsistency Detection**: Identification of contradictory business rules, conflicting SLAs, and security vs. performance trade-offs.
7. **Agile User Story Synthesis**: Standard Connextra format (*As a... I want to... So that...*) with story points.
8. **Acceptance Criteria & Gherkin**: Given-When-Then BDD scenarios and testability verification.
9. **Cockburn Textual Use Cases**: Actors, preconditions, postconditions, main success flows, and exception branches.
10. **QA Test Case Matrix**: Multi-level testing suites (Positive, Negative, Boundary, Security, Concurrency).
11. **Risk Identification**: Risk ID, probability, impact, risk exposure scores, and architectural mitigations.
12. **IEEE 830 SRS Generation**: Sectional coherence and formal requirements specification.
13. **Structured Output Reliability**: Strict JSON schema enforcement, type validation, and parsing success rate.

### Evaluation Workflow:
- **STEP 1: Select Project**: Select current active project context.
- **STEP 2: Select Domain Benchmark**: Railway Reservation, E-Commerce, Hospital Management, Banking, Disaster Management, or User Custom Dataset.
- **STEP 3: Select Ingestion Method**: Ground-Truth Dataset, Active Project Backlog, File Upload, or Manual Text.
- **STEP 4: Select Competing Models**: OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, Meta Llama 3.1 70B, or Custom Endpoints.
- **STEP 5: Select Tasks**: Choose individual tasks or execute the complete 13-task test suite.
- **STEP 6: Run Benchmark**: Live animated execution and metric calculation.

### Interactive Visualizations & Features:
- **8-Dimensional SVG Radar Chart**: Interactive polygon comparison across RE competencies.
- **Multiclass Confusion Matrix**: Cell intensity drill-down with Macro-Precision, Recall, and F1 metrics.
- **Head-to-Head Model Matchup**: Model A vs. Model B direct score differentials, win-loss breakdown, and strengths/weaknesses.
- **Split-Screen Output Inspector**: Verbatim standardized prompt inspection, side-by-side model raw output, and AI Judge assessment with manual override.
- **Cost vs Performance Frontier**: Scatter plot comparing estimated $/run vs. RequireX Evaluation Score.
- **Observed Response Latency**: Round-trip token inference speeds in milliseconds.
- **Comprehensive Exporters**: One-click download of evaluation reports in **PDF**, **Word (.docx)**, and **CSV** formats.

---

## 🌟 Key Features & Modules

1. **Commercial Dark Neon Interface**: Sleek Linear/Vercel/OpenAI-inspired SaaS aesthetic with `#0B0B0F` background, neon cyan/blue/purple glows, glassmorphism cards, and Framer Motion micro-animations.
2. **Module 1 & 2: Requirement Upload & Classification**: Ingest PDF, DOCX, TXT documents or interview transcripts. Classifies requirements into Functional, Non-functional, Business, System, User, and Technical categories.
3. **Module 3 & 4: IEEE Quality Audit & Standard Rewriter**: Detects ambiguity, missing actors, non-testable clauses, and missing constraints with confidence ratings. Rewrites poor requirements into formal IEEE statements (*"The system shall..."*).
4. **Module 5: Domain Missing Requirement Recommender**: Recommends domain-specific security, audit log, and performance requirements for Railway, Hospital, E-Commerce, Banking, Education, Food Delivery, and more.
5. **Module 6: Agile User Story Board**: Automatically synthesizes Agile stories (*As a... I want to... So that...*) with Fibonacci points (3, 5, 8), acceptance criteria checklists, and Definition of Done.
6. **Module 7 & 8: Textual Use Case & Acceptance Criteria Generator**: Generates primary actors, preconditions, postconditions, main success flows, alternative flows, and exception paths.
7. **Module 9: Automated Test Case Matrix**: Synthesizes Positive, Negative, Boundary, Validation, Security, and Performance test cases complete with inputs, expected outputs, priority, and status.
8. **Module 10: Risk & Volatility Radar**: Evaluates requirement volatility, project risks, complexity, and generates automated AI mitigation action strategies.
9. **Module 11: Requirement Traceability Matrix (RTM)**: Dynamic mapping between Requirements <-> Use Cases <-> Test Cases with real-time coverage meters.
10. **Module 12 & 13: IEEE SRS Generator & Multi-Format Exporter**: Live preview of full IEEE Std 830/29148 documents with one-click export to **PDF**, **Word (.docx)**, **Markdown (.md)**, and **Plain Text (.txt)**.
11. **AI Co-Pilot Assistant**: Slide-out interactive AI chatbot answering contextual project queries.
12. **Global Search (Ctrl+K) & Snapshot Version History**: Instant search index and snapshot restore timeline.

---

## 🚀 Quick Run Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch

1. **Clone or navigate to the project directory**:
   ```bash
   cd "PROJECT SOFTWARE ENGINEERING"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment (Optional)**:
   ```bash
   cp .env.example .env.local
   ```
   *Note: If no API keys are configured, RequireX seamlessly runs in deterministic **"Demo / Mock Evaluation Mode"** with zero network barriers.*

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

5. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 🔬 Scientific Methodology & Academic Limitations

- **Standardized Prompts**: Every model receives the exact same verbatim requirements document and prompt instructions.
- **Ground-Truth Comparison**: Mathematical evaluation against verified domain baselines.
- **Domain Specificity**: Benchmark scores measure Requirements Engineering performance and should not be construed as universal general intelligence rankings.
- **Academic Ethics**: Demo mode is clearly labelled to ensure transparency and scientific integrity.

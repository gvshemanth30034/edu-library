import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';
import { PDFs } from '../src/data/resourcesCatalog.js';

const ROOT = process.cwd();
const outputDir = path.join(ROOT, 'public', 'files', 'pdfs');

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const textBlock = (doc, text, options = {}) => {
  doc
    .font('Helvetica')
    .fontSize(options.size || 11)
    .fillColor(options.color || '#1f2937')
    .text(text, {
      width: 500,
      lineGap: options.lineGap || 3,
      align: options.align || 'left',
    });
};

const heading = (doc, value) => {
  doc
    .moveDown(0.4)
    .font('Helvetica-Bold')
    .fontSize(15)
    .fillColor('#0f766e')
    .text(value, { width: 500 });
  doc.moveDown(0.15);
};

const bullets = (doc, items) => {
  doc.moveDown(0.1);
  items.forEach((item) => {
    doc
      .font('Helvetica')
      .fontSize(11)
      .fillColor('#111827')
      .text(`• ${item}`, {
        width: 490,
        indent: 14,
        lineGap: 3,
      });
  });
  doc.moveDown(0.25);
};

const footer = (doc, pageNumber) => {
  doc
    .font('Helvetica')
    .fontSize(9)
    .fillColor('#6b7280')
    .text(`Educational Resource Library • Page ${pageNumber}`, 50, 790, {
      width: 500,
      align: 'center',
    });
};

const sanitizeFileName = (url) => {
  const fileName = path.basename(url || 'resource.pdf');
  return fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
};

const buildSections = ({ title, subject, level }) => ({
  intro: [
    `${title} provides a structured academic overview for ${subject} learners.`,
    `This guide is designed for ${level || 'intermediate'} learners preparing for coursework and practical application.`,
    'The objective is to strengthen conceptual understanding and improve exam readiness through concise explanations.',
  ],
  concepts: [
    `Core principles of ${subject} and their role in modern curricula.`,
    'Terminology, theory foundations, and conceptual links between major units.',
    'Common patterns and frameworks used in assignments, labs, and project discussions.',
    'How this topic connects with adjacent subjects and interdisciplinary use-cases.',
  ],
  examples: [
    `Worked examples that simulate typical classroom problems in ${subject}.`,
    'Scenario-based interpretation to convert theory into practical reasoning.',
    'Step-by-step walkthrough style for clear method selection and error reduction.',
    'Quick checks to validate output quality and concept correctness.',
  ],
  bestPractices: [
    'Use structured notes: definitions, formulas/rules, and summary points.',
    'Practice active recall by explaining key concepts without looking at notes.',
    'Review edge cases and exceptions, not only standard textbook examples.',
    'Map each chapter to expected exam outcomes and project deliverables.',
  ],
  conclusion: [
    `${title} should be revised alongside solved exercises for long-term retention.`,
    'Frequent short revision cycles are more effective than last-minute preparation.',
    'Combine this guide with lab records, reference papers, and instructor feedback for best performance.',
  ],
});

const createPdf = (resource) => {
  const fileName = sanitizeFileName(resource.url);
  const filePath = path.join(outputDir, fileName);
  const subject = resource.subject || 'General Studies';
  const level = resource.level || 'Intermediate';
  const sections = buildSections({ title: resource.title, subject, level });

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  let page = 1;

  doc
    .font('Helvetica-Bold')
    .fontSize(24)
    .fillColor('#0f172a')
    .text(resource.title, { width: 500 });

  doc
    .moveDown(0.4)
    .font('Helvetica')
    .fontSize(12)
    .fillColor('#334155')
    .text(`Subject: ${subject}`)
    .text(`Level: ${level}`)
    .text('Prepared for Educational Resource Library Students');

  heading(doc, '1. Introduction');
  textBlock(doc, sections.intro.join(' '));

  heading(doc, '2. Core Concepts');
  bullets(doc, sections.concepts);

  heading(doc, '3. Guided Examples');
  textBlock(doc, sections.examples[0]);
  bullets(doc, sections.examples.slice(1));

  heading(doc, '4. Study Approach & Best Practices');
  bullets(doc, sections.bestPractices);

  footer(doc, page);
  doc.addPage();
  page += 1;

  heading(doc, '5. Conclusion and Revision Plan');
  textBlock(doc, sections.conclusion.join(' '));

  heading(doc, 'Quick Revision Checklist');
  bullets(doc, [
    `Summarize the most important ${subject} principles in your own words.`,
    'Practice at least three representative problems from each chapter.',
    'Compare your approach with standard solutions and refine weak areas.',
    'Prepare a one-page recap sheet for final exam revision.',
  ]);

  heading(doc, 'Recommended Next Reading');
  bullets(doc, [
    `${subject} advanced reference notes and practical lab manuals.`,
    'Peer-reviewed survey papers to understand current trends.',
    'Instructor-provided assignments for concept application.',
  ]);

  footer(doc, page);
  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};

const run = async () => {
  ensureDir(outputDir);

  for (const resource of PDFs) {
    // eslint-disable-next-line no-await-in-loop
    await createPdf(resource);
  }

  console.log(`Generated ${PDFs.length} course PDFs in ${outputDir}`);
};

run().catch((error) => {
  console.error('Failed to generate course PDFs:', error);
  process.exitCode = 1;
});

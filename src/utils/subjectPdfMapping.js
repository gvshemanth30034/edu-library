const SUBJECT_PDF_MAP = {
  'operating systems': '/files/pdfs/operating-systems-guide.pdf',
  os: '/files/pdfs/operating-systems-guide.pdf',
  'database management systems': '/files/pdfs/database-management-systems-guide.pdf',
  dbms: '/files/pdfs/database-management-systems-guide.pdf',
  'computer networks': '/files/pdfs/computer-networks-guide.pdf',
  cn: '/files/pdfs/computer-networks-guide.pdf',
  'artificial intelligence': '/files/pdfs/artificial-intelligence-guide.pdf',
  ai: '/files/pdfs/artificial-intelligence-guide.pdf',
  'software engineering': '/files/pdfs/software-engineering-guide.pdf',
  se: '/files/pdfs/software-engineering-guide.pdf',
  'control systems': '/files/pdfs/control-systems-quick-notes.pdf',
};

const TITLE_PDF_MAP = {
  'control systems workbook': '/files/pdfs/control-systems-quick-notes.pdf',
  'control systems': '/files/pdfs/control-systems-quick-notes.pdf',
  'software engineering handbook': '/files/pdfs/software-engineering-guide.pdf',
  'data structures': '/files/pdfs/data-structures-algorithms-notes.pdf',
  'digital signal processing': '/files/pdfs/digital-signal-processing-notes.pdf',
  'computer networks': '/files/pdfs/computer-networks-guide.pdf',
  'operating systems': '/files/pdfs/operating-systems-guide.pdf',
  'machine learning': '/files/pdfs/artificial-intelligence-guide.pdf',
  'dbms': '/files/pdfs/database-management-systems-guide.pdf',
  'database management': '/files/pdfs/database-management-systems-guide.pdf',
};

const CATEGORY_PDF_MAP = {
  'computer science': '/files/pdfs/software-engineering-guide.pdf',
  electronics: '/files/pdfs/computer-networks-guide.pdf',
  mathematics: '/files/pdfs/linear-algebra-for-engineers.pdf',
  'mechanical engg.': '/files/pdfs/thermodynamics-fundamentals.pdf',
  'civil engineering': '/files/pdfs/engineering-mechanics-statics.pdf',
  physics: '/files/pdfs/signals-and-systems-study-guide.pdf',
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const containsKeyword = (text, keyword) => {
  const normalizedText = String(text || '').toLowerCase();
  const normalizedKeyword = String(keyword || '').toLowerCase().trim();
  if (!normalizedKeyword) return false;

  // Short abbreviations should only match full tokens, not inside other words.
  if (normalizedKeyword.length <= 3) {
    const pattern = new RegExp(`\\b${escapeRegex(normalizedKeyword)}\\b`, 'i');
    return pattern.test(normalizedText);
  }

  return normalizedText.includes(normalizedKeyword);
};

export const findMappedPdfUrl = ({ title = '', subject = '', category = '' } = {}) => {
  const titleText = String(title || '').toLowerCase();
  const text = `${title} ${subject} ${category}`.toLowerCase();

  // Priority 1: exact/near title match to keep viewer heading aligned with clicked item.
  for (const [keyword, url] of Object.entries(TITLE_PDF_MAP)) {
    if (containsKeyword(titleText, keyword)) {
      return url;
    }
  }

  for (const [keyword, url] of Object.entries(SUBJECT_PDF_MAP)) {
    if (containsKeyword(text, keyword)) {
      return url;
    }
  }

  const categoryKey = String(subject || category || '').toLowerCase();
  return CATEGORY_PDF_MAP[categoryKey] || null;
};

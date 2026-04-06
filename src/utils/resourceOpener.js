import { findMappedPdfUrl } from './subjectPdfMapping.js';

const DOC_EXTENSIONS = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'];
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'mov', 'm4v'];
const PDF_EXTENSIONS = ['pdf'];
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'avif'];
const DOCUMENT_LIKE_TYPES = ['doc', 'docx', 'word', 'document', 'article', 'report', 'archive', 'dataset', 'standards', 'legal document'];
const EXTERNAL_PROTOCOLS = ['http://', 'https://'];
const SAMPLE_DOC_URL = 'https://calibre-ebook.com/downloads/demos/demo.docx';
const SAMPLE_IMAGE_URL = 'https://via.placeholder.com/1200x800.png?text=Resource+Preview';
const SAMPLE_PDF_URL = '/files/pdfs/data-structures-algorithms-notes.pdf';
const TRUSTED_EMBED_HOSTS = new Set([window.location.host]);

const VIDEO_TITLE_MAP = {
  'react basics tutorial': 'https://www.youtube.com/watch?v=bMknfKXIFA8',
  'dbms full course': 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
  'advanced python programming': 'https://www.youtube.com/watch?v=rfscVS0vtbw',
  'signal processing fundamentals': 'https://www.youtube.com/watch?v=Qy9VGxJ1U0Q',
  'circuit theory videos': 'https://www.youtube.com/watch?v=5f0x4QyJkN0',
  'machine learning basics': 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
  'embedded systems programming': 'https://www.youtube.com/watch?v=F321087yYy4',
  'deep learning with pytorch': 'https://www.youtube.com/watch?v=V_xro1bcAuA',
  'devops & ci/cd pipeline': 'https://www.youtube.com/watch?v=scEDHsr3APg',
};

const normalizeTitle = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

const getYouTubeUrlForResource = (resource, currentUrl) => {
  const current = String(currentUrl || '').trim();
  if (/youtube\.com|youtu\.be/i.test(current)) {
    return current;
  }

  const title = String(resource?.title || '').trim();
  const key = normalizeTitle(title);
  if (VIDEO_TITLE_MAP[key]) {
    return VIDEO_TITLE_MAP[key];
  }

  const query = encodeURIComponent(title || 'educational video lecture');
  return `https://www.youtube.com/results?search_query=${query}`;
};

const getUrlFromResource = (resource) => {
  if (!resource || typeof resource !== 'object') return '';
  return (
    resource.url ||
    resource.fileUrl ||
    resource.mediaUrl ||
    resource.link ||
    ''
  );
};

const getFileExtension = (url) => {
  const cleanUrl = String(url || '').split('#')[0].split('?')[0];
  const lastDot = cleanUrl.lastIndexOf('.');
  if (lastDot === -1) return '';
  return cleanUrl.slice(lastDot + 1).toLowerCase();
};

const isExternalUrl = (url) => {
  const normalized = String(url || '').toLowerCase();
  return EXTERNAL_PROTOCOLS.some((protocol) => normalized.startsWith(protocol));
};

export const isEmbeddable = (url) => {
  if (!url) return false;

  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin === window.location.origin) {
      return true;
    }

    return TRUSTED_EMBED_HOSTS.has(parsed.host);
  } catch {
    return false;
  }
};

const normalizeAbsoluteUrl = (url) => {
  if (!url) return '';
  if (isExternalUrl(url)) return url;
  if (url.startsWith('/')) {
    return `${window.location.origin}${url}`;
  }
  return `${window.location.origin}/${url}`;
};

const remapBrokenLocalFileUrl = (url, resource) => {
  const path = String(url || '').toLowerCase();
  if (!path.includes('/files/')) {
    return url;
  }

  const declaredType = String(resource?.type || '').trim().toLowerCase();
  const extension = getFileExtension(url);

  if (declaredType === 'image' || IMAGE_EXTENSIONS.includes(extension)) {
    return SAMPLE_IMAGE_URL;
  }

  if (declaredType === 'doc' || declaredType === 'docx' || DOC_EXTENSIONS.includes(extension)) {
    return SAMPLE_DOC_URL;
  }

  if (declaredType === 'pdf' || PDF_EXTENSIONS.includes(extension)) {
    // Keep local /files/pdfs URLs untouched so real generated PDFs can load.
    return url;
  }

  return url;
};

export const openResourceByType = (resource) => {
  const declaredType = String(resource?.type || '').trim().toLowerCase();
  const rawUrl = getUrlFromResource(resource);

  const fallbackPdfUrl = findMappedPdfUrl({
    title: resource?.title,
    subject: resource?.subject,
    category: resource?.category,
  }) || SAMPLE_PDF_URL;

  const fallbackUrlByType = () => {
    if (declaredType === 'video') {
      return '';
    }

    if (declaredType === 'pdf') {
      return fallbackPdfUrl;
    }

    if (DOCUMENT_LIKE_TYPES.includes(declaredType)) {
      return SAMPLE_DOC_URL;
    }

    if (declaredType === 'image') {
      return SAMPLE_IMAGE_URL;
    }

    return fallbackPdfUrl;
  };

  const safeRawUrl = rawUrl || fallbackUrlByType();

  const resolvedUrl = declaredType === 'video'
    ? getYouTubeUrlForResource(resource, safeRawUrl)
    : safeRawUrl;

  const url = remapBrokenLocalFileUrl(normalizeAbsoluteUrl(resolvedUrl), resource);
  const extension = getFileExtension(url);

  const isPdf = declaredType === 'pdf' || PDF_EXTENSIONS.includes(extension);
  const isDoc = DOCUMENT_LIKE_TYPES.includes(declaredType) || DOC_EXTENSIONS.includes(extension);
  const isVideo = ['video', 'mp4', 'webm'].includes(declaredType) || VIDEO_EXTENSIONS.includes(extension);
  const isImage = ['image', 'img', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(declaredType) || IMAGE_EXTENSIONS.includes(extension);
  const isExternalLink = declaredType === 'link' || isExternalUrl(url);

  if (isPdf) {
    const viewerUrl = `/resource-preview?url=${encodeURIComponent(url)}&title=${encodeURIComponent(resource?.title || 'Untitled Resource')}&subject=${encodeURIComponent(resource?.subject || resource?.category || 'Unknown Subject')}&type=pdf`;
    window.open(viewerUrl, '_blank');
    return;
  }

  if (isDoc) {
     const viewerUrl = `/document-preview?url=${encodeURIComponent(url)}&title=${encodeURIComponent(resource?.title || 'Untitled Resource')}&subject=${encodeURIComponent(resource?.subject || resource?.category || 'Unknown Subject')}&type=document`;
     window.open(viewerUrl, '_blank');
    return;
  }

  if (isVideo || isImage) {
    window.open(url, '_blank');
    return;
  }

  if (isExternalLink) {
    window.open(url, '_blank');
    return;
  }

  // Fallback: open unknown file types in a new tab.
  window.open(url, '_blank');
};

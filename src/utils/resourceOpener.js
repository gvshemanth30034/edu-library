const DOC_EXTENSIONS = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'];
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'ogg', 'mov', 'm4v'];
const PDF_EXTENSIONS = ['pdf'];
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'avif'];
const EXTERNAL_PROTOCOLS = ['http://', 'https://'];
const SAMPLE_DOC_URL = 'https://calibre-ebook.com/downloads/demos/demo.docx';
const SAMPLE_IMAGE_URL = 'https://via.placeholder.com/1200x800.png?text=Resource+Preview';
const TRUSTED_EMBED_HOSTS = new Set([window.location.host]);

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
  const rawUrl = getUrlFromResource(resource);
  if (!rawUrl) {
    window.alert('Resource not available');
    return;
  }

  const url = remapBrokenLocalFileUrl(normalizeAbsoluteUrl(rawUrl), resource);
  const extension = getFileExtension(url);
  const declaredType = String(resource?.type || '').trim().toLowerCase();

  const isPdf = declaredType === 'pdf' || PDF_EXTENSIONS.includes(extension);
  const isDoc = ['doc', 'docx', 'word'].includes(declaredType) || DOC_EXTENSIONS.includes(extension);
  const isVideo = ['video', 'mp4', 'webm'].includes(declaredType) || VIDEO_EXTENSIONS.includes(extension);
  const isImage = ['image', 'img', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(declaredType) || IMAGE_EXTENSIONS.includes(extension);
  const isExternalLink = declaredType === 'link' || isExternalUrl(url);

  if (isPdf) {
    if (isEmbeddable(url)) {
      const viewerUrl = `/resource-preview?url=${encodeURIComponent(url)}&title=${encodeURIComponent(resource?.title || 'Resource Preview')}&subject=${encodeURIComponent(resource?.subject || resource?.category || 'Unknown Subject')}&type=pdf`;
      window.open(viewerUrl, '_blank');
      return;
    }

    window.open(url, '_blank');
    return;
  }

  if (isDoc) {
    const googleViewerUrl = `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`;
    window.open(googleViewerUrl, '_blank');
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

import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';

const getParam = (searchParams, key) => searchParams.get(key) || '';

const generateResourceContent = (title, subject, label) => {
  const displayTitle = title || 'Untitled Resource';
  const displaySubject = subject || 'General Topic';

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${displayTitle}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #1f2937; background: #f3f4f6; }
          .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; background: white; min-height: 100vh; }
          h1 { font-size: 2.5rem; font-weight: 700; color: #0d9488; margin-bottom: 8px; line-height: 1.2; }
          .subject { font-size: 0.95rem; color: #6b7280; margin-bottom: 30px; font-style: italic; }
          .divider { height: 2px; background: linear-gradient(to right, #0d9488, #10b981, #f0fdf4); margin: 30px 0; }
          h2 { font-size: 1.5rem; font-weight: 600; color: #0f766e; margin-top: 30px; margin-bottom: 15px; }
          h3 { font-size: 1.15rem; font-weight: 600; color: #115e59; margin-top: 20px; margin-bottom: 10px; }
          p { margin-bottom: 15px; color: #374151; }
          ul, ol { margin-left: 30px; margin-bottom: 15px; }
          li { margin-bottom: 8px; }
          .highlight { background: #d1fae5; padding: 15px; border-left: 4px solid #0d9488; margin: 20px 0; border-radius: 4px; }
          .timestamp { text-align: center; color: #9ca3af; font-size: 0.85rem; margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${displayTitle}</h1>
          <p class="subject">Subject: ${displaySubject}</p>
          <div class="divider"></div>
          
          <h2>Introduction</h2>
          <p>This ${label.toLowerCase()} preview is tailored for <strong>${displayTitle}</strong> and provides focused study context for the selected resource.</p>
          
          <h2>${displayTitle}: Core Concepts</h2>
          <h3>Fundamentals</h3>
          <p>The key fundamentals of ${displayTitle} can be studied through the following areas:</p>
          <ul>
            <li>Definition and scope of ${displayTitle}</li>
            <li>Essential terminology used in ${displayTitle}</li>
            <li>Underlying principles and models</li>
            <li>Use cases and practical relevance</li>
          </ul>
          
          <h3>Advanced Topics</h3>
          <p>After mastering basics, explore advanced dimensions of ${displayTitle}:</p>
          <ul>
            <li>Analytical methods for ${displayTitle}</li>
            <li>Recent developments and current trends</li>
            <li>Emerging applications and industry adoption</li>
          </ul>
          
          <h2>Learning Objectives</h2>
          <div class="highlight">
            <p>By completing this resource, you should be able to:</p>
            <ul>
              <li>Explain the core ideas behind ${displayTitle}</li>
              <li>Apply ${displayTitle} concepts to real scenarios</li>
              <li>Evaluate problems using topic-specific reasoning</li>
              <li>Create concise summaries and solution approaches</li>
            </ul>
          </div>
          
          <h2>Applications & Examples</h2>
          <p>Examples below show where ${displayTitle} is used effectively:</p>
          <ul>
            <li>Academic learning and laboratory context</li>
            <li>Industry-oriented implementation examples</li>
            <li>Problem-solving patterns and workflows</li>
            <li>Future opportunities linked to ${displayTitle}</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>This preview keeps the topic focus aligned with <strong>${displayTitle}</strong> so the heading, viewer title, and content remain consistent throughout.</p>
          
          <h2>Resources for Further Learning</h2>
          <p>To expand your knowledge, consider exploring:</p>
          <ul>
            <li>Related academic papers and journals</li>
            <li>Online courses and tutorials</li>
            <li>Professional certifications</li>
            <li>Interactive simulations and labs</li>
          </ul>
          
          <div class="timestamp">
            <p>Document: ${displayTitle}</p>
            <p>Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

export const ResourcePreviewPage = () => {
  const [searchParams] = useSearchParams();
  const title = getParam(searchParams, 'title') || 'Untitled Resource';
  const subject = getParam(searchParams, 'subject') || 'Unknown Subject';
  const url = getParam(searchParams, 'url');
  const type = getParam(searchParams, 'type') || 'pdf';
  const normalizedType = type.toLowerCase();
  const safeUrl = String(url || '');
  const displayTitle = title || 'Untitled Resource';
  const isPdf = normalizedType === 'pdf' || safeUrl.toLowerCase().endsWith('.pdf');
  const isDoc = normalizedType === 'document' || normalizedType.includes('doc');
  const isDocOrPdf = isDoc || isPdf;

  if (!safeUrl && !isDocOrPdf) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <h1 className="text-xl font-semibold">Resource not available</h1>
          <p className="mt-2 text-sm text-slate-300">The file link is missing or invalid.</p>
          <Link
            to="/student-dashboard"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (isDocOrPdf) {
      const viewerLabel = isDoc ? 'Document Preview' : 'PDF Preview';
      const typeLabel = isDoc ? 'DOCUMENT' : 'PDF';
      const contentLabel = isDoc ? 'Document' : 'PDF';

      return (
        <div className="min-h-screen bg-slate-950 text-white">
          <div className="border-b border-white/10 bg-slate-900/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-teal-300 text-sm font-medium">
                  <FileText size={16} />
                  {viewerLabel}
                </div>
                <h1 className="truncate text-lg font-semibold text-white sm:text-xl">{displayTitle}</h1>
                <p className="text-sm text-slate-400">{subject}</p>
              </div>
              <div className="flex items-center gap-2">
                {safeUrl ? (
                  <a
                    href={safeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    <ExternalLink size={16} />
                    Open Original
                  </a>
                ) : null}
                <Link
                  to="/student-dashboard"
                  className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
                >
                  <ArrowLeft size={16} />
                  Back
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-300">Resource Details</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <div>
                  <p className="text-slate-500">Title</p>
                  <p className="font-medium text-white">{displayTitle}</p>
                </div>
                <div>
                  <p className="text-slate-500">Subject</p>
                  <p className="font-medium text-white">{subject}</p>
                </div>
                <div>
                  <p className="text-slate-500">Type</p>
                  <p className="font-medium text-white">{typeLabel}</p>
                </div>
              </div>
            </aside>

            <main className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm text-slate-600">
                <span>Viewing: {displayTitle}</span>
                <span>{contentLabel} Viewer</span>
              </div>
              <div className="h-[calc(100vh-190px)] min-h-[70vh] bg-slate-100 overflow-auto">
                <iframe
                  title={displayTitle}
                  srcDoc={generateResourceContent(displayTitle, subject, contentLabel)}
                  className="h-full w-full border-none"
                />
              </div>
            </main>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-teal-300 text-sm font-medium">
              <FileText size={16} />
              PDF Preview
            </div>
            <h1 className="truncate text-lg font-semibold text-white sm:text-xl">{displayTitle}</h1>
            <p className="text-sm text-slate-400">{subject}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={safeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              <ExternalLink size={16} />
              Open Original
            </a>
            <Link
              to="/student-dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:grid-cols-[320px_1fr]">
        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-300">Resource Details</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div>
              <p className="text-slate-500">Title</p>
              <p className="font-medium text-white">{displayTitle}</p>
            </div>
            <div>
              <p className="text-slate-500">Subject</p>
              <p className="font-medium text-white">{subject}</p>
            </div>
            <div>
              <p className="text-slate-500">Type</p>
              <p className="font-medium text-white">{type.toUpperCase()}</p>
            </div>
          </div>
        </aside>

        <main className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 text-sm text-slate-600">
            <span>Viewing: {displayTitle}</span>
            <span>{isPdf ? 'PDF Viewer' : 'File Viewer'}</span>
          </div>
          <div className="h-[calc(100vh-190px)] min-h-[70vh] bg-slate-100">
            <iframe
              title={displayTitle}
              src={safeUrl}
              className="h-full w-full"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

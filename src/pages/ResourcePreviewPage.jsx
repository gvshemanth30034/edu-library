import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { isEmbeddable } from '../utils/resourceOpener.js';

const getParam = (searchParams, key) => searchParams.get(key) || '';

export const ResourcePreviewPage = () => {
  const [searchParams] = useSearchParams();
  const title = getParam(searchParams, 'title') || 'Resource Preview';
  const subject = getParam(searchParams, 'subject') || 'Unknown Subject';
  const url = getParam(searchParams, 'url');
  const type = getParam(searchParams, 'type') || 'pdf';

  if (!url) {
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

  const isPdf = type.toLowerCase() === 'pdf' || url.toLowerCase().endsWith('.pdf');
  const canEmbed = isEmbeddable(url);

  if (isPdf && !canEmbed) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <div className="border-b border-white/10 bg-slate-900/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-teal-300 text-sm font-medium">
                <FileText size={16} />
                PDF Preview
              </div>
              <h1 className="truncate text-lg font-semibold text-white sm:text-xl">{title}</h1>
              <p className="text-sm text-slate-400">{subject}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.open(url, '_blank')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                <ExternalLink size={16} />
                Open in New Tab
              </button>
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
                <p className="font-medium text-white">{title}</p>
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

          <main className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="max-w-md rounded-2xl border border-white/10 bg-slate-900/90 p-6 text-center shadow-xl">
              <h2 className="text-xl font-semibold text-white">Preview not available</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                This PDF is hosted on an external domain and cannot be embedded here.
                Use the button below to open it in a new tab.
              </p>
              <button
                type="button"
                onClick={() => window.open(url, '_blank')}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
              >
                <ExternalLink size={16} />
                Open in New Tab
              </button>
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
            <h1 className="truncate text-lg font-semibold text-white sm:text-xl">{title}</h1>
            <p className="text-sm text-slate-400">{subject}</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={url}
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
              <p className="font-medium text-white">{title}</p>
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
            <span>Viewing: {title}</span>
            <span>{isPdf ? 'PDF Viewer' : 'File Viewer'}</span>
          </div>
          <div className="h-[calc(100vh-190px)] min-h-[70vh] bg-slate-100">
            <iframe
              title={title}
              src={isPdf ? url : url}
              className="h-full w-full"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

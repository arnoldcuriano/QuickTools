import React, { useRef } from 'react';
import {
  ArrowRightIcon,
  CodeBracketIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  QrCodeIcon,
  PhotoIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Square3Stack3DIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import AppHeader from '../components/ui/AppHeader';

const tools = [
  {
    name: 'Base64 Encoder/Decoder',
    path: '/tools/base64',
    icon: CodeBracketIcon,
    description: 'Encode readable text or decode valid Base64 strings directly in the browser.',
    meta: 'Text utility',
  },
  {
    name: 'JSON Converter',
    path: '/tools/json-converter',
    icon: Square3Stack3DIcon,
    description: 'Beautify or minify JSON with immediate validation feedback.',
    meta: 'Data formatter',
  },
  {
    name: 'Text Formatter',
    path: '/tools/text-formatter',
    icon: DocumentTextIcon,
    description: 'Clean JSON, XML, HTML, and plain text into readable output.',
    meta: 'Content cleanup',
  },
  {
    name: 'WebP Converter',
    path: '/tools/webp-converter',
    icon: PhotoIcon,
    description: 'Convert up to 20 JPG or PNG images into optimized WebP files.',
    meta: 'Image conversion',
  },
];

const developerTools = [
  {
    name: 'QR Code Generator',
    path: '/tools/qr-code-generator',
    icon: QrCodeIcon,
    description: 'Generate browser-only QR codes with premium styling, logo overlays, and download support.',
    meta: 'Link sharing',
  },
  {
    name: 'JSON Compare',
    path: '/tools/json-compare',
    icon: DocumentMagnifyingGlassIcon,
    description: 'Compare two JSON documents and inspect nested additions, removals, and changes.',
    meta: 'Diff review',
  },
  {
    name: 'CSV / TSV Converter',
    path: '/tools/csv-tsv-converter',
    icon: TableCellsIcon,
    description: 'Convert quoted delimited data locally between CSV and TSV with table previews.',
    meta: 'Data exchange',
  },
  {
    name: 'Regex Tester',
    path: '/tools/regex-tester',
    icon: MagnifyingGlassIcon,
    description: 'Test expressions, view captured groups, and highlight matches in-place.',
    meta: 'Pattern tools',
  },
];

const principles = [
  'Browser-local processing by default',
  'Focused tools with visible validation',
  'No account, install, or backend upload required',
];

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

const QuickToolsLanding = () => {
  const toolsSectionRef = useRef<HTMLElement>(null);

  const scrollToTools = () => {
    toolsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="brand-page min-h-screen">
      <AppHeader>
        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-muted md:flex">
          <button type="button" onClick={scrollToTools} className="transition-colors hover:text-brand-accent">
            Tools
          </button>
          <a href="#privacy" className="transition-colors hover:text-brand-accent">
            Privacy-first
          </a>
          <a href="#workflow" className="transition-colors hover:text-brand-accent">
            Workflow
          </a>
        </nav>
        <Button onClick={scrollToTools} className="brand-button hidden px-3 py-2 text-sm sm:inline-flex sm:px-4">
          <span className="sm:hidden">Tools</span>
          <span className="hidden sm:inline">Open tools</span>
        </Button>
      </AppHeader>

      <main>
        <section className="brand-shell py-16 lg:py-24">
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[1fr_520px]">
            <motion.div initial="hidden" animate="visible" variants={panelVariants} className="min-w-0">
              <h1 className="max-w-4xl text-2xl font-bold leading-tight text-brand sm:text-5xl lg:text-6xl">
                <span className="block sm:inline">Client-side tools for</span>
                <span className="block sm:inline"> everyday file and text work</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
                Convert images, format data, encode text, and work through developer utilities directly in your browser.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={scrollToTools} className="brand-button px-5 py-3">
                  Browse tools
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
                <Link to="/tools/json-converter" className="brand-button-secondary px-5 py-3">
                  Open JSON converter
                </Link>
              </div>
              <div id="privacy" className="mt-10 grid gap-3 text-sm text-brand-muted sm:grid-cols-3">
                {principles.map((principle) => (
                  <div key={principle} className="brand-panel flex items-start gap-3 p-4">
                    <ShieldCheckIcon className="mt-0.5 h-5 w-5 flex-none text-brand-accent" />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={panelVariants}
              transition={{ delay: 0.08 }}
              className="brand-panel-raised hidden w-full min-w-0 max-w-full overflow-hidden lg:block"
            >
              <div className="flex items-center justify-between border-b border-brand px-5 py-4">
                <div>
                  <p className="font-display text-lg font-semibold text-brand">Tool workspace</p>
                  <p className="text-sm text-brand-muted">Input, validate, copy, download.</p>
                </div>
                <div className="hidden rounded-[var(--radius-sm)] bg-[var(--color-accent)] px-3 py-1.5 text-sm font-semibold text-[var(--color-accent-text)] sm:block">
                  Live
                </div>
              </div>
              <div className="grid gap-4 p-5">
                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                  <div className="brand-code-panel min-h-48 min-w-0 p-4">
                    <div className="mb-3 flex items-center justify-between text-xs text-brand-muted">
                      <span>Input</span>
                      <span>128 chars</span>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed text-brand">{`{"tool":"quicktools","mode":"beautify"}`}</pre>
                  </div>
                  <div className="brand-code-panel min-h-48 min-w-0 p-4">
                    <div className="mb-3 flex items-center justify-between text-xs text-brand-muted">
                      <span>Output</span>
                      <span>ready</span>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed text-brand">{`{
  "tool": "quicktools",
  "mode": "beautify"
}`}</pre>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {['Beautify', 'Minify', 'Copy'].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-[var(--radius-sm)] border px-3 py-2 text-center text-sm font-semibold ${
                        index === 0
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                          : 'border-brand bg-brand-surface text-brand-muted'
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="workflow" className="brand-shell pb-10">
          <div className="brand-panel-raised grid gap-4 p-5 md:grid-cols-3">
            {['Choose a tool', 'Paste or upload', 'Copy or download'].map((step, index) => (
              <div key={step} className="flex gap-4">
                <div className="flex h-8 w-8 flex-none items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-surface)] font-display font-semibold text-brand-accent">
                  {index + 1}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-brand">{step}</h2>
                  <p className="mt-1 text-sm text-brand-muted">
                    {index === 0
                      ? 'Open one of the implemented utilities.'
                      : index === 1
                        ? 'Run work locally with clear validation.'
                        : 'Take the result into your workflow.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={toolsSectionRef} className="brand-shell py-14">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold text-brand">Available tools</h2>
              <p className="mt-2 max-w-2xl text-brand-muted">
                The catalog only lists tools that have implemented routes in this app.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-muted">
              <SparklesIcon className="h-5 w-5 text-brand-accent" />
              <span>Modular utilities, one frame</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="brand-panel group block p-5 transition-colors hover:border-[var(--color-accent)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] text-brand-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-brand-faint transition-transform group-hover:translate-x-1 group-hover:text-brand-accent" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-faint">{tool.meta}</p>
                  <h3 className="mt-2 text-xl font-semibold text-brand">{tool.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="brand-shell pb-14">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold text-brand">Developer tools</h2>
              <p className="mt-2 max-w-2xl text-brand-muted">
                Browser-only utilities for generation, comparison, parsing, and inspection.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-muted">
              <SparklesIcon className="h-5 w-5 text-brand-accent" />
              <span>Local, fast, and open source</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {developerTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="brand-panel group block p-5 transition-colors hover:border-[var(--color-accent)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] text-brand-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-brand-faint transition-transform group-hover:translate-x-1 group-hover:text-brand-accent" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-faint">{tool.meta}</p>
                  <h3 className="mt-2 text-xl font-semibold text-brand">{tool.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{tool.description}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-brand">
        <div className="brand-shell flex flex-col gap-4 py-8 text-sm text-brand-muted md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span aria-hidden="true" className="brand-mark-icon h-7 w-7" />
            <span className="brand-wordmark text-xl">quicktools</span>
          </Link>
          <p>Client-first utilities for text, data, and image conversion.</p>
        </div>
      </footer>
    </div>
  );
};

export default QuickToolsLanding;

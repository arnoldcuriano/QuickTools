import React, { useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
  ArrowsRightLeftIcon,
  InformationCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button, Textarea } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import { DelimitedFormat, convertDelimitedText, parseDelimitedText, summarizeDelimitedRows } from '../../utils/delimitedText';

const sampleCsv = 'name,role,location\n"QuickTools","Browser app","Local machine"\n"QR","Generator","Client-side"';

const formatLabels: Record<DelimitedFormat, string> = {
  csv: 'CSV',
  tsv: 'TSV',
};

const CSVTSVConverter = () => {
  const [input, setInput] = useState(sampleCsv);
  const [sourceFormat, setSourceFormat] = useState<DelimitedFormat>('csv');
  const [targetFormat, setTargetFormat] = useState<DelimitedFormat>('tsv');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const parsedResult = useMemo(() => {
    try {
      return { rows: parseDelimitedText(input, sourceFormat), error: '' };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to parse delimited text.';
      return { rows: [], error: message };
    }
  }, [input, sourceFormat]);

  const convertedOutput = useMemo(() => {
    if (!input.trim()) {
      return '';
    }

    try {
      return convertDelimitedText(input, sourceFormat, targetFormat);
    } catch {
      return '';
    }
  }, [input, sourceFormat, targetFormat]);

  const summary = useMemo(() => summarizeDelimitedRows(parsedResult.rows), [parsedResult.rows]);

  const clearAll = () => {
    setInput('');
    setCopied(false);
  };

  const swapFormats = () => {
    setSourceFormat(targetFormat);
    setTargetFormat(sourceFormat);
  };

  const copyOutput = async () => {
    if (!convertedOutput) {
      return;
    }

    await navigator.clipboard.writeText(convertedOutput);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const buttonVariants: Variants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <AppHeader>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            onClick={copyOutput}
            disabled={!convertedOutput}
            className="relative flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? <ClipboardDocumentCheckIcon className="h-4 w-4" /> : <ClipboardIcon className="h-4 w-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </Button>
        </motion.div>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            onClick={clearAll}
            className="relative flex items-center space-x-2 rounded-xl bg-white/5 px-6 py-2.5 font-medium text-gray-200 shadow-lg shadow-black/10 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
          >
            <TrashIcon className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        </motion.div>
      </AppHeader>

      <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="relative py-20">
        <div className="brand-shell">
          <div className="mb-12 text-center">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="inline-block mb-4">
              <Button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <ArrowLeftIcon className="h-6 w-6" />
                <span>Back to Home</span>
              </Button>
            </motion.div>
            <h1 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              CSV / TSV Converter
            </h1>
            <p className="mx-auto max-w-4xl text-xl text-gray-300">
              Convert delimited data locally, preserve quoted values, and switch between CSV and TSV without leaving the browser.
            </p>
          </div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mb-8 flex items-start space-x-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <InformationCircleIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-cyan-400" />
            <div>
              <h2 className="mb-2 text-lg font-semibold text-white">Browser-delimited workflow</h2>
              <p className="text-gray-300">
                Paste a table export, convert it in place, and inspect rows or output without sending data to a service.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Input</h2>
                <span className="text-sm text-gray-400">{input.length} characters</span>
              </div>
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Paste CSV or TSV content here..."
                className="h-[28rem] w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="flex flex-wrap gap-2">
                {['Load sample CSV', 'Load sample TSV'].map((label, index) => (
                  <motion.div key={label} variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      onClick={() => {
                        if (index === 0) {
                          setSourceFormat('csv');
                          setTargetFormat('tsv');
                          setInput(sampleCsv);
                        } else {
                          setSourceFormat('tsv');
                          setTargetFormat('csv');
                          setInput('name\trole\tlocation\nQuickTools\tBrowser app\tLocal machine');
                        }
                      }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                    >
                      {label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Conversion</h2>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      onClick={swapFormats}
                      className="inline-flex items-center space-x-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-white"
                    >
                      <ArrowsRightLeftIcon className="h-4 w-4" />
                      <span>Swap</span>
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {(['csv', 'tsv'] as DelimitedFormat[]).map((formatKey) => (
                    <label key={formatKey} className="block text-sm text-gray-300">
                      {formatKey === sourceFormat ? 'Source' : 'Target'} format
                      <select
                        value={formatKey === sourceFormat ? sourceFormat : targetFormat}
                        onChange={(event) => {
                          if (formatKey === sourceFormat) {
                            setSourceFormat(event.target.value as DelimitedFormat);
                          } else {
                            setTargetFormat(event.target.value as DelimitedFormat);
                          }
                        }}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        {(Object.keys(formatLabels) as DelimitedFormat[]).map((option) => (
                          <option key={option} value={option}>
                            {formatLabels[option]}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { label: 'Rows', value: summary.rowCount },
                    { label: 'Columns', value: summary.columnCount },
                    { label: 'Preview', value: convertedOutput ? 'Ready' : 'Empty' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3">
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {parsedResult.error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-start space-x-3 rounded-xl border border-red-500/20 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                    <p className="text-red-300">{parsedResult.error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Converted output</h2>
                  <span className="text-sm text-gray-400">{convertedOutput.length} characters</span>
                </div>
                <Textarea
                  value={convertedOutput}
                  readOnly
                  placeholder="Converted output appears here..."
                  className="mt-4 h-64 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-white placeholder-gray-400"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white">Table preview</h2>
                <div className="mt-4 max-h-[16rem] overflow-auto rounded-xl border border-white/10">
                  <table className="min-w-full border-collapse text-left text-sm text-gray-200">
                    <tbody>
                      {parsedResult.rows.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`} className="border-b border-white/10 last:border-b-0">
                          {row.map((cell, cellIndex) => (
                            <td key={`cell-${rowIndex}-${cellIndex}`} className="border-r border-white/10 px-3 py-2 last:border-r-0">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CSVTSVConverter;

import React, { useMemo, useState } from 'react';
import {
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button, Textarea } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import { compareJsonTexts, formatJsonCompareValue } from '../../utils/jsonCompare';

const sampleLeft = '{"name":"QuickTools","version":"1.0","features":["base64","json","text"]}';
const sampleRight = '{"name":"QuickTools","version":"1.1","features":["base64","json","text","qr"]}';

const JSONCompare = () => {
  const [leftText, setLeftText] = useState(sampleLeft);
  const [rightText, setRightText] = useState(sampleRight);
  const navigate = useNavigate();

  const comparison = useMemo(() => compareJsonTexts(leftText, rightText), [leftText, rightText]);

  const clearAll = () => {
    setLeftText('');
    setRightText('');
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
            onClick={clearAll}
            className="relative flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40"
          >
            <TrashIcon className="h-4 w-4" />
            <span>Clear All</span>
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
              JSON Compare
            </h1>
            <p className="mx-auto max-w-4xl text-xl text-gray-300">
              Compare two JSON documents in the browser and see added, removed, and changed values instantly.
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
              <h2 className="mb-2 text-lg font-semibold text-white">Comparison mode</h2>
              <p className="text-gray-300">
                Parse both sides locally, compare nested objects and arrays, and keep the diff readable without sending data to a server.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Left JSON</h2>
                <span className="text-sm text-gray-400">{leftText.length} characters</span>
              </div>
              <Textarea
                value={leftText}
                onChange={(event) => setLeftText(event.target.value)}
                placeholder="Paste the original JSON here..."
                className="h-[28rem] w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Right JSON</h2>
                <span className="text-sm text-gray-400">{rightText.length} characters</span>
              </div>
              <Textarea
                value={rightText}
                onChange={(event) => setRightText(event.target.value)}
                placeholder="Paste the new JSON here..."
                className="h-[28rem] w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Summary</h2>
                <div className="mt-4 grid gap-3">
                  {[
                    { label: 'Added', value: comparison.summary.added },
                    { label: 'Removed', value: comparison.summary.removed },
                    { label: 'Changed', value: comparison.summary.changed },
                    { label: 'Total', value: comparison.summary.total },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3">
                      <span className="text-sm text-gray-300">{item.label}</span>
                      <span className="text-lg font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-gray-300">
                  {comparison.summary.identical ? 'The JSON documents are identical.' : 'Differences are listed below.'}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white">Differences</h2>
                <div className="mt-4 max-h-[20rem] space-y-3 overflow-y-auto pr-1">
                  {comparison.differences.length === 0 ? (
                    <p className="text-sm text-gray-400">No differences detected.</p>
                  ) : (
                    comparison.differences.map((difference) => (
                      <div key={`${difference.kind}-${difference.path}`} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-sm text-cyan-300">{difference.path}</span>
                          <span className="rounded-full border border-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
                            {difference.kind}
                          </span>
                        </div>
                        <div className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                          <div>
                            <p className="mb-1 text-gray-400">Left</p>
                            <pre className="whitespace-pre-wrap break-words rounded-lg bg-black/30 p-3 text-gray-200">
                              {formatJsonCompareValue(difference.leftValue)}
                            </pre>
                          </div>
                          <div>
                            <p className="mb-1 text-gray-400">Right</p>
                            <pre className="whitespace-pre-wrap break-words rounded-lg bg-black/30 p-3 text-gray-200">
                              {formatJsonCompareValue(difference.rightValue)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {comparison.error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 flex items-start space-x-3 rounded-xl border border-red-500/20 bg-white/5 p-4 backdrop-blur-xl"
              >
                <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="text-red-300">{comparison.error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
};

export default JSONCompare;

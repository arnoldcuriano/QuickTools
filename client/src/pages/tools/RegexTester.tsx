import React, { useMemo, useState } from 'react';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Textarea } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import AppHeader from '../../components/ui/AppHeader';
import ToolWorkbenchHeader from '../../components/ui/ToolWorkbenchHeader';
import {
  analyseRegexText,
  buildRegexFlags,
  splitTextByMatches,
} from '../../utils/regexTools';

const samplePattern = '\\bQuickTools\\b';
const sampleText = 'QuickTools runs in the browser. QuickTools keeps data local.';

const flagOptions = [
  { key: 'global', label: 'g' },
  { key: 'ignoreCase', label: 'i' },
  { key: 'multiline', label: 'm' },
  { key: 'dotAll', label: 's' },
  { key: 'unicode', label: 'u' },
];

const RegexTester = () => {
  const [pattern, setPattern] = useState(samplePattern);
  const [text, setText] = useState(sampleText);
  const [global, setGlobal] = useState(true);
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [multiline, setMultiline] = useState(false);
  const [dotAll, setDotAll] = useState(false);
  const [unicode, setUnicode] = useState(false);

  const flags = buildRegexFlags({ global, ignoreCase, multiline, dotAll, unicode, sticky: false });

  const analysis = useMemo(() => analyseRegexText(text, pattern, flags), [flags, pattern, text]);
  const segments = useMemo(() => splitTextByMatches(text, analysis.matches), [analysis.matches, text]);

  const clearAll = () => {
    setPattern('');
    setText('');
    setGlobal(true);
    setIgnoreCase(false);
    setMultiline(false);
    setDotAll(false);
    setUnicode(false);
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="tool-page">
      <AppHeader />

      <motion.section variants={sectionVariants} initial="hidden" animate="visible" className="relative py-20">
        <div className="brand-shell">
          <ToolWorkbenchHeader
            title="Regex Tester"
            description="Test expressions, inspect matches, and highlight results locally without shipping data to a server."
            onReset={clearAll}
            resetLabel="Reset"
            resetDisabled={!pattern && !text}
          />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="mb-8 flex items-start space-x-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <InformationCircleIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand" />
            <div>
              <h2 className="mb-2 text-lg font-semibold text-white">Regex inspection</h2>
              <p className="text-gray-300">
                Enter a pattern, toggle flags, and inspect live matches with a readable highlighted preview.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Pattern</h2>
                <span className="text-sm text-gray-400">Flags: /{flags}/</span>
              </div>
              <input
                value={pattern}
                onChange={(event) => setPattern(event.target.value)}
                placeholder="Enter regex pattern..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-base text-white placeholder-gray-400 outline-none focus:ring-2"
              />
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="text-base font-semibold text-white">Flags</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {flagOptions.map((flag) => (
                    <label key={flag.key} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm text-gray-300">
                      <input
                        type="checkbox"
                        checked={
                          (flag.key === 'global' && global) ||
                          (flag.key === 'ignoreCase' && ignoreCase) ||
                          (flag.key === 'multiline' && multiline) ||
                          (flag.key === 'dotAll' && dotAll) ||
                          (flag.key === 'unicode' && unicode)
                        }
                        onChange={(event) => {
                          const checked = event.target.checked;
                          if (flag.key === 'global') setGlobal(checked);
                          if (flag.key === 'ignoreCase') setIgnoreCase(checked);
                          if (flag.key === 'multiline') setMultiline(checked);
                          if (flag.key === 'dotAll') setDotAll(checked);
                          if (flag.key === 'unicode') setUnicode(checked);
                        }}
                        className="h-4 w-4 rounded border-white/20 bg-transparent accent-[var(--accent)]"
                      />
                      <span>/{flag.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Test input</h2>
                  <span className="text-sm text-gray-400">{text.length} characters</span>
                </div>
                <Textarea
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Paste test text here..."
                  className="h-[20rem] w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-white">Match summary</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {[
                    { label: 'Matches', value: analysis.totalMatches },
                    { label: 'Pattern', value: analysis.regex ? 'Valid' : 'Invalid' },
                    { label: 'Mode', value: global ? 'Global' : 'Single' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3">
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="mt-1 text-lg font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-gray-300">
                  {analysis.matches.length > 0 ? `First match: ${analysis.matches[0].text}` : 'No matches found.'}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white">Highlighted preview</h2>
                <div className="mt-4 max-h-[18rem] overflow-auto rounded-xl border border-white/10 bg-slate-950/50 p-4 font-mono text-sm leading-6 text-gray-200 whitespace-pre-wrap">
                  {segments.map((segment) => (
                    <span
                      key={segment.key}
                      className={segment.matched ? 'rounded border-b border-brand px-0.5 text-brand' : ''}
                    >
                      {segment.text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-lg font-semibold text-white">Matches</h2>
                <div className="mt-4 max-h-[18rem] space-y-3 overflow-y-auto pr-1">
                  {analysis.matches.length === 0 ? (
                    <p className="text-sm text-gray-400">No matches to show.</p>
                  ) : (
                    analysis.matches.map((match, index) => (
                      <div key={`${match.start}-${match.end}-${index}`} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-sm text-brand">
                            Match {index + 1} at {match.start}-{match.end}
                          </span>
                          <span className="text-sm text-gray-300">{match.text}</span>
                        </div>
                        {match.groups.length > 0 && (
                          <div className="mt-3 grid gap-2">
                            {match.groups.map((group, groupIndex) => (
                              <div key={`${match.start}-${groupIndex}`} className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-gray-200">
                                <span className="mr-2 text-gray-400">Group {groupIndex + 1}:</span>
                                {group || <span className="text-gray-500">empty</span>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {analysis.error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 flex items-start space-x-3 rounded-xl border border-brand bg-white/5 p-4 backdrop-blur-xl"
              >
                <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                <p className="text-brand">{analysis.error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
};

export default RegexTester;

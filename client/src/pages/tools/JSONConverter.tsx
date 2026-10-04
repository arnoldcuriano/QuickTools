import React, { useState, useCallback } from 'react';
import { 
  ClipboardIcon, 
  ClipboardDocumentCheckIcon, 
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Button, Textarea } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { convertJson, JSONConverterOptions } from '../../utils/jsonConverter';
import AppHeader from '../../components/ui/AppHeader';
import ToolWorkbenchHeader from '../../components/ui/ToolWorkbenchHeader';

const JSONConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'beautify' | 'minify'>('beautify');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [sizeReduction, setSizeReduction] = useState<string>('');

  const sampleJsons = [
    '{"name":"John","age":30,"city":"New York"}',
    '{"id":1,"title":"Hello","active":true}',
    '{"items":["apple","banana","orange"]}',
  ];

  const formatJson = useCallback(async (text: string, formatMode: 'beautify' | 'minify') => {
    setError('');
    setSizeReduction('');
    const options: JSONConverterOptions = { mode: formatMode, indent: 2 };
    const { result, error } = await convertJson(text, options);
    setOutput(result);
    if (error) {
      setError(error);
    } else if (formatMode === 'minify') {
      const originalSize = text.length;
      const resultSize = result.length;
      if (originalSize > resultSize) {
        const reductionPercent = ((originalSize - resultSize) / originalSize * 100).toFixed(1);
        setSizeReduction(`Size reduced by ${reductionPercent}% (${originalSize} → ${resultSize} characters)`);
      }
    }
  }, []);

  const handleInputChange = async (value: string) => {
    setInput(value);
    await formatJson(value, mode);
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'beautify' ? 'minify' : 'beautify';
    setMode(newMode);
    setError('');
    setSizeReduction('');
    if (input.trim()) {
      formatJson(input, newMode);
    }
  };

  const copyToClipboard = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setSizeReduction('');
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants: Variants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const textareaVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="tool-page">
      <AppHeader />

      {/* Main Content */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative py-20"
      >
        <div className="brand-shell">
          <ToolWorkbenchHeader
            title="JSON Converter"
            description="Beautify or minify your JSON data with ease for better readability or compact storage."
            onReset={clearAll}
            resetDisabled={!input && !output && !error}
          />

          {/* Info Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start space-x-3"
          >
            <InformationCircleIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand" />
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">About JSON Converter</h2>
              <p className="text-gray-300">
                Format JSON for readability with proper indentation or minify it to reduce size for efficient storage and transmission.
              </p>
            </div>
          </motion.div>

          {/* Mode Switcher */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mb-8 flex justify-center"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center space-x-2">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => {
                    if (mode !== 'beautify') {
                      setMode('beautify');
                      setInput('');
                      setOutput('');
                      setError('');
                      setSizeReduction('');
                    }
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    mode === 'beautify'
                      ? 'brand-button'
                      : 'text-brand-muted hover:text-brand'
                  }`}
                >
                  Beautify
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={handleModeSwitch}
                  className="p-2 text-gray-300 hover:text-white"
                  title="Switch mode"
                  aria-label="Switch between beautify and minify"
                >
                  <ArrowsRightLeftIcon className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => {
                    if (mode !== 'minify') {
                      setMode('minify');
                      setInput('');
                      setOutput('');
                      setError('');
                      setSizeReduction('');
                    }
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    mode === 'minify'
                      ? 'brand-button'
                      : 'text-brand-muted hover:text-brand'
                  }`}
                >
                  Minify
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Input/Output Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={textareaVariants} initial="hidden" animate="visible" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Input JSON</h2>
                <span className="text-gray-400 text-sm">{input.length} characters</span>
              </div>
              <Textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Enter JSON to format..."
                className="w-full h-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Sample JSONs:</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleJsons.map((sample, index) => (
                    <motion.div key={index} variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button
                        onClick={() => handleInputChange(sample)}
                        className="px-3 py-1 backdrop-blur-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm rounded-lg border border-white/10"
                      >
                        {sample.length > 30 ? `${sample.substring(0, 30)}...` : sample}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={textareaVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Formatted JSON</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">{output.length} characters</span>
                  {output && (
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button
                        onClick={copyToClipboard}
                        className="brand-button px-3 py-1 text-sm"
                      >
                        {copied ? (
                          <>
                            <ClipboardDocumentCheckIcon className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <ClipboardIcon className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className="w-full h-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 resize-none"
              />
              <AnimatePresence>
                {sizeReduction && mode === 'minify' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="backdrop-blur-xl bg-white/5 border border-brand rounded-xl p-4 flex items-start space-x-3"
                  >
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                    <p className="text-brand">{sizeReduction}</p>
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="backdrop-blur-xl bg-white/5 border border-brand rounded-xl p-4 flex items-start space-x-3"
                  >
                    <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand" />
                    <p className="text-brand">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default JSONConverter;

import React, { useState, useCallback } from 'react';
import { 
  ClipboardIcon, 
  ClipboardDocumentCheckIcon, 
  ArrowsRightLeftIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { Button, Textarea } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import AppHeader from '../../components/ui/AppHeader';
import ToolWorkbenchHeader from '../../components/ui/ToolWorkbenchHeader';

const Base64Tool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const processText = useCallback((text: string, operation: string) => {
    setError('');
    if (!text.trim()) {
      setOutput('');
      return;
    }
    try {
      if (operation === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(text)));
        setOutput(decoded);
      }
    } catch {
      setError(operation === 'decode' ? 'Invalid Base64 string.' : 'Error encoding text.');
      setOutput('');
    }
  }, []);

  const handleInputChange = (value: string) => {
    setInput(value);
    processText(value, mode);
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
    setOutput(input);
    if (output.trim()) {
      processText(output, newMode);
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
  };

  const sampleTexts = {
    encode: ['Hello, World!', 'QuickTools is awesome!', 'https://example.com/api/data', '{"name": "John", "age": 30}'],
    decode: ['SGVsbG8sIFdvcmxkIQ==', 'UXVpY2tUb29scyBpcyBhd2Vzb21lIQ==', 'aHR0cHM6Ly9leGFtcGxlLmNvbS9hcGkvZGF0YQ==', 'eyJuYW1lIjogIkpvaG4iLCAiYWdlIjogMzB9'],
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const buttonVariants: Variants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const textareaVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
            title="Base64 Encoder/Decoder"
            description="Convert text to Base64 and vice versa with ease. Perfect for embedding assets or encoding data URIs."
            onReset={clearAll}
            resetDisabled={!input && !output && !error}
          />

          {/* Mode Switcher */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center space-x-2">
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => {
                    if (mode !== 'encode') {
                      setMode('encode');
                      setInput('');
                      setOutput('');
                      setError('');
                    }
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    mode === 'encode'
                      ? 'brand-button'
                      : 'text-brand-muted hover:text-brand'
                  }`}
                >
                  Encode
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={handleModeSwitch}
                  className="p-2 text-gray-300 hover:text-white"
                  title="Switch mode"
                  aria-label="Switch between encode and decode"
                >
                  <ArrowsRightLeftIcon className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => {
                    if (mode !== 'decode') {
                      setMode('decode');
                      setInput('');
                      setOutput('');
                      setError('');
                    }
                  }}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    mode === 'decode'
                      ? 'brand-button'
                      : 'text-brand-muted hover:text-brand'
                  }`}
                >
                  Decode
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start space-x-3"
          >
            <InformationCircleIcon className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand" />
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">About Base64</h2>
              <p className="text-gray-300">
                Base64 is a binary-to-text encoding scheme used to encode binary data for text-based protocols, such as embedding images in HTML or encoding API credentials.
              </p>
            </div>
          </motion.div>

          {/* Input/Output Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={textareaVariants} initial="hidden" animate="visible" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">{mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}</h2>
                <span className="text-gray-400 text-sm">{input.length} characters</span>
              </div>
              <Textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                className="w-full h-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Sample texts:</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleTexts[mode].map((sample, index) => (
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
                <h2 className="text-xl font-semibold text-white">{mode === 'encode' ? 'Base64 Encoded' : 'Decoded Text'}</h2>
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
                placeholder="Output will appear here..."
                className="w-full h-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 resize-none"
              />
              <AnimatePresence>
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

export default Base64Tool;

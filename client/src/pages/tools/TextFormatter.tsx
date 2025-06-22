import React, { useState, useCallback } from 'react';
import { 
  ArrowLeftIcon, 
  ClipboardIcon, 
  ClipboardDocumentCheckIcon, 
  TrashIcon,
  SparklesIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { Button, Textarea, Listbox } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format as prettierFormat } from 'prettier/standalone';
import babelParser from 'prettier/parser-babel';
import xmlPlugin from '@prettier/plugin-xml';
import markdownParser from 'prettier/parser-markdown';
import { DOMParser, XMLSerializer } from '@xmldom/xmldom';
import { html as beautifyHtml } from 'js-beautify';

// Helper function to format XML strings
const formatXmlString = (xmlString: string): string => {
  try {
    const PADDING = ' '.repeat(2); // 2 spaces for indentation
    const reg = /(>)(<)(\/*)/g;
    let formatted = xmlString.replace(reg, '$1\r\n$2$3');
    let pad = 0;
    
    return formatted.split('\r\n').map((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/) && pad > 0) {
        pad -= 1;
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
      
      const padding = PADDING.repeat(pad);
      pad += indent;
      return padding + node;
    }).join('\n');
  } catch (error) {
    return xmlString; // Return original if formatting fails
  }
};

const TextFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [format, setFormat] = useState<'json' | 'xml' | 'html' | 'text'>('json');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const formats = [
    { id: 'json', name: 'JSON' },
    { id: 'xml', name: 'XML' },
    { id: 'html', name: 'HTML' },
    { id: 'text', name: 'Plain Text' }
  ];

  const sampleTexts = {
    json: [
      '{"name":"John","age":30,"city":"New York"}',
      '{"id":1,"title":"Hello","active":true}',
      '{"items":["apple","banana","orange"]}'
    ],
    xml: [
      '<root><name>John</name><age>30</age><city>New York</city></root>',
      '<person><id>1</id><role>Developer</role></person>',
      '<data><item>Item 1</item><item>Item 2</item></data>'
    ],
    html: [
      '<p>Hello</p>',
      '<div><h1>Welcome</h1></div>',
      '<ul><li>Item 1</li><li>Item 2</li></ul>'
    ],
    text: [
      'This is a very long line of text that should be wrapped at 80 characters to make it more readable and properly formatted for display purposes.',
      'QuickTools is a productivity platform.\n\n\n\nIt helps users format text efficiently.\n\n\n\nTry it out today!',
      '   Messy    text   with   extra    spaces   and   \n\n\n\n\n   multiple   newlines   that   needs   cleanup.   '
    ]
  };

  const formatText = useCallback(async (text: string, type: string) => {
    setError('');
    const trimmedText = text.trim();
    if (!trimmedText) {
      setOutput('');
      return;
    }
    
    try {
      if (type === 'json') {
        // Parse and validate JSON first
        const parsed = JSON.parse(trimmedText);
        const jsonString = JSON.stringify(parsed, null, 2);
        
        try {
          const formatted = await prettierFormat(jsonString, {
            parser: 'json',
            plugins: [babelParser],
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: false,
            singleQuote: false,
            trailingComma: 'none'
          });
          setOutput(formatted);
        } catch (prettierError) {
          // Fallback to basic JSON formatting if Prettier fails
          setOutput(jsonString);
        }
      } else if (type === 'xml') {
        try {
          const parser = new DOMParser();
          const doc = parser.parseFromString(trimmedText, 'text/xml');
          
          // Check for parsing errors
          const parseErrors = doc.getElementsByTagName('parsererror');
          if (parseErrors.length > 0) {
            throw new Error('Invalid XML structure');
          }
          
          const serializer = new XMLSerializer();
          const xmlString = serializer.serializeToString(doc);
          
          // Use basic XML formatting instead of Prettier for better reliability
          const formatted = formatXmlString(xmlString);
          setOutput(formatted);
        } catch (xmlError) {
          // Fallback to very basic XML formatting
          const basicFormatted = formatXmlString(trimmedText);
          setOutput(basicFormatted);
        }
      } else if (type === 'html') {
        try {
          const formatted = beautifyHtml(trimmedText, { 
            indent_size: 2,
            indent_char: ' ',
            max_preserve_newlines: 2,
            preserve_newlines: true,
            indent_scripts: 'normal',
            end_with_newline: false,
            wrap_line_length: 0,
            indent_inner_html: false
          });
          setOutput(formatted);
        } catch (htmlError) {
          throw new Error('Invalid HTML structure');
        }
      } else if (type === 'text') {
        // Plain text formatting: line wrapping, paragraph cleanup, and whitespace normalization
        const lines = trimmedText.split('\n');
        const formatted = lines
          .map(line => line.trim()) // Remove leading/trailing whitespace
          .filter((line, index, arr) => {
            // Remove empty lines but keep one empty line between paragraphs
            if (line === '') {
              const prevLine = arr[index - 1];
              const nextLine = arr[index + 1];
              return prevLine && nextLine && prevLine !== '' && nextLine !== '';
            }
            return true;
          })
          .map(line => {
            if (line === '') return line;
            
            // Word wrap long lines at 80 characters
            if (line.length <= 80) return line;
            
            const words = line.split(' ');
            const wrappedLines = [];
            let currentLine = '';
            
            for (const word of words) {
              if (currentLine.length + word.length + 1 <= 80) {
                currentLine += (currentLine ? ' ' : '') + word;
              } else {
                if (currentLine) wrappedLines.push(currentLine);
                currentLine = word;
              }
            }
            if (currentLine) wrappedLines.push(currentLine);
            
            return wrappedLines.join('\n');
          })
          .join('\n')
          .replace(/\n{3,}/g, '\n\n'); // Replace multiple newlines with double newlines
        
        setOutput(formatted);
      }
    } catch (err) {
      console.error('Formatting error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown formatting error';
      setError(`Invalid ${type.toUpperCase()} input: ${errorMessage}`);
      setOutput('');
    }
  }, []);

  const handleInputChange = async (value: string) => {
    try {
      setInput(value);
      await formatText(value, format);
    } catch (err) {
      console.error('Input change error:', err);
    }
  };

  const handleFormatChange = (newFormat: 'json' | 'xml' | 'html' | 'text') => {
    setFormat(newFormat);
    setError('');
    setOutput('');
    setInput('');
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

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <header className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                QuickTools
              </span>
            </div>
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={clearAll}
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl font-medium flex items-center space-x-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Clear All</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="relative py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="inline-block mb-4">
              <Button onClick={() => navigate('/')} className="text-gray-300 hover:text-white flex items-center space-x-2">
                <ArrowLeftIcon className="w-6 h-6" />
                <span>Back to Home</span>
              </Button>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Text Formatter
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Format JSON, XML, HTML, or plain text with proper indentation and line breaks for clean, readable output.
            </p>
          </div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-12 flex justify-center relative z-50"
          >
            <Listbox value={format} onChange={handleFormatChange}>
              <div className="relative">
                <Listbox.Button className="relative w-48 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center justify-between">
                  <span>{formats.find(f => f.id === format)?.name}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Listbox.Button>
                <AnimatePresence>
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="absolute mt-2 w-48 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <Listbox.Options>
                      {formats.map(f => (
                        <Listbox.Option
                          key={f.id}
                          value={f.id}
                          className={({ active }) =>
                            `px-4 py-2 text-gray-300 cursor-pointer transition-all duration-200 ${
                              active ? 'bg-cyan-500/20 text-white scale-105' : ''
                            }`
                          }
                        >
                          {f.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </motion.div>
                </AnimatePresence>
              </div>
            </Listbox>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mb-12 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 flex items-start space-x-4 relative z-10"
          >
            <InformationCircleIcon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">About Text Formatter</h3>
              <p className="text-gray-300 leading-relaxed">
                Beautify your JSON, XML, HTML, or plain text with proper formatting to enhance readability and streamline your workflow.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={textareaVariants} initial="hidden" animate="visible" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Input Text</h2>
                <span className="text-gray-400 text-sm">{input.length} characters</span>
              </div>
              <Textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={`Enter ${format.toUpperCase()} to format...`}
                className="w-full h-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Sample texts:</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleTexts[format].map((sample, index) => (
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
                <h2 className="text-xl font-semibold text-white">Formatted Output</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">{output.length} characters</span>
                  {output && (
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button
                        onClick={copyToClipboard}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-3 py-1 rounded-lg flex items-center space-x-1 text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
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
                placeholder="Formatted output will appear here..."
                className="w-full h-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-gray-400 resize-none"
              />
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3"
                  >
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300">{error}</p>
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

export default TextFormatter;
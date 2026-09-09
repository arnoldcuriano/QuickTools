import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CloudArrowDownIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button, Textarea } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import {
  generatePremiumQrCodeDataUrl,
  QrErrorCorrectionLevel,
} from '../../utils/qrCode';

const sampleValues = [
  'https://quicktools.dev',
  'mailto:hello@quicktools.dev',
  'QuickTools QR generator',
  'WIFI:T:WPA;S:QuickTools;P:browser-only;;',
];

const errorCorrectionOptions: Array<{ value: QrErrorCorrectionLevel; label: string }> = [
  { value: 'L', label: 'L' },
  { value: 'M', label: 'M' },
  { value: 'Q', label: 'Q' },
  { value: 'H', label: 'H' },
];

const QRCodeGenerator = () => {
  const [content, setContent] = useState(sampleValues[0]);
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<QrErrorCorrectionLevel>('M');
  const [foreground, setForeground] = useState('#111827');
  const [background, setBackground] = useState('#ffffff');
  const [frameText, setFrameText] = useState('Scan to open');
  const [logoDataUrl, setLogoDataUrl] = useState<string>('');
  const [logoName, setLogoName] = useState('');
  const [logoScale, setLogoScale] = useState(22);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const clearAll = useCallback(() => {
    setContent(sampleValues[0]);
    setSize(320);
    setMargin(2);
    setErrorCorrectionLevel('M');
    setForeground('#111827');
    setBackground('#ffffff');
    setFrameText('Scan to open');
    setLogoDataUrl('');
    setLogoName('');
    setLogoScale(22);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const renderQr = async () => {
      const trimmedContent = content.trim();
      if (!trimmedContent) {
        setPreviewUrl('');
        setError('');
        setIsGenerating(false);
        return;
      }

      try {
        setIsGenerating(true);
        const dataUrl = await generatePremiumQrCodeDataUrl(trimmedContent, {
          size,
          margin,
          errorCorrectionLevel,
          darkColor: foreground,
          lightColor: background,
          logoDataUrl: logoDataUrl || null,
          logoScale: logoScale / 100,
          frameText,
        });

        if (!cancelled) {
          setPreviewUrl(dataUrl);
          setError('');
        }
      } catch (generationError) {
        if (!cancelled) {
          const message = generationError instanceof Error ? generationError.message : 'QR generation failed.';
          setError(message);
          setPreviewUrl('');
        }
      } finally {
        if (!cancelled) {
          setIsGenerating(false);
        }
      }
    };

    renderQr();

    return () => {
      cancelled = true;
    };
  }, [background, content, errorCorrectionLevel, foreground, frameText, logoDataUrl, logoScale, margin, size]);

  const downloadQr = async () => {
    if (!previewUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = 'quicktools-qr.png';
    link.click();
  };

  const handleLogoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Logo uploads must be image files.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoDataUrl(String(reader.result ?? ''));
      setLogoName(file.name);
    };
    reader.onerror = () => setError('Failed to read logo image.');
    reader.readAsDataURL(file);
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const buttonVariants: Variants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
  };

  const isContentEmpty = useMemo(() => !content.trim(), [content]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-3/4 left-3/4 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <AppHeader>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            onClick={downloadQr}
            className="relative flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 font-medium text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/40"
          >
            <CloudArrowDownIcon className="h-4 w-4" />
            <span>Download PNG</span>
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
              QR Code Generator
            </h1>
            <p className="mx-auto max-w-4xl text-xl text-gray-300">
              Generate browser-only QR codes with logo, frame, and color controls. No cloud processing required.
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
              <h2 className="mb-2 text-lg font-semibold text-white">About QR generation</h2>
              <p className="text-gray-300">
                Build a scannable code locally, style it for marketing or sharing, and keep the full workflow inside the browser.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">Content</h2>
                  <span className="text-sm text-gray-400">{content.length} characters</span>
                </div>
                <Textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Enter text, URL, phone number, Wi-Fi payload, or any shareable content..."
                  className="mt-4 h-40 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <div className="mt-4 flex flex-wrap gap-2">
                  {sampleValues.map((sample) => (
                    <motion.div key={sample} variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button
                        onClick={() => setContent(sample)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
                      >
                        {sample.length > 28 ? `${sample.slice(0, 28)}...` : sample}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <h2 className="text-base font-semibold text-white">Basic options</h2>
                  <div className="mt-4 space-y-4">
                    <label className="block text-sm text-gray-300">
                      Size: {size}px
                      <input
                        type="range"
                        min="200"
                        max="512"
                        step="8"
                        value={size}
                        onChange={(event) => setSize(Number(event.target.value))}
                        className="mt-2 w-full accent-cyan-500"
                      />
                    </label>
                    <label className="block text-sm text-gray-300">
                      Margin: {margin}
                      <input
                        type="range"
                        min="0"
                        max="8"
                        step="1"
                        value={margin}
                        onChange={(event) => setMargin(Number(event.target.value))}
                        className="mt-2 w-full accent-cyan-500"
                      />
                    </label>
                    <label className="block text-sm text-gray-300">
                      Error correction
                      <select
                        value={errorCorrectionLevel}
                        onChange={(event) => setErrorCorrectionLevel(event.target.value as QrErrorCorrectionLevel)}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        {errorCorrectionOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <h2 className="text-base font-semibold text-white">Colors</h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <label className="block text-sm text-gray-300">
                      Foreground
                      <input
                        type="color"
                        value={foreground}
                        onChange={(event) => setForeground(event.target.value)}
                        className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-transparent p-1"
                      />
                    </label>
                    <label className="block text-sm text-gray-300">
                      Background
                      <input
                        type="color"
                        value={background}
                        onChange={(event) => setBackground(event.target.value)}
                        className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-transparent p-1"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h2 className="text-base font-semibold text-white">Premium options</h2>
                <div className="mt-4 grid gap-4">
                  <label className="block text-sm text-gray-300">
                    Frame text
                    <input
                      type="text"
                      value={frameText}
                      onChange={(event) => setFrameText(event.target.value)}
                      placeholder="Scan to open"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </label>
                  <label className="block text-sm text-gray-300">
                    Logo scale: {logoScale}%
                    <input
                      type="range"
                      min="16"
                      max="34"
                      step="1"
                      value={logoScale}
                      onChange={(event) => setLogoScale(Number(event.target.value))}
                      className="mt-2 w-full accent-cyan-500"
                    />
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-white"
                      >
                        {logoName ? 'Replace logo' : 'Upload logo'}
                      </Button>
                    </motion.div>
                    {logoName && <span className="text-sm text-gray-400">{logoName}</span>}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">Preview</h2>
                  <span className="text-sm text-gray-400">{isGenerating ? 'Rendering...' : 'Ready'}</span>
                </div>
                <div className="mt-4 flex min-h-[26rem] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-6">
                  {previewUrl && !isContentEmpty ? (
                    <img
                      src={previewUrl}
                      alt="Generated QR code preview"
                      className="max-h-[24rem] max-w-full rounded-2xl bg-white p-3 shadow-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <p className="text-lg font-medium text-gray-300">Your QR code will appear here</p>
                      <p className="mt-2 text-sm">Type content on the left to generate a code locally.</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                      onClick={downloadQr}
                      disabled={!previewUrl}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CloudArrowDownIcon className="h-4 w-4" />
                      Download PNG
                    </Button>
                  </motion.div>
                  {logoName && <span className="text-sm text-gray-400">Logo applied from {logoName}</span>}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                  <div>
                    <h3 className="text-base font-semibold text-white">Browser-only output</h3>
                    <p className="mt-1 text-sm text-gray-300">
                      QR generation stays inside the browser. No upload step is required for content, logo, or styling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-8 flex items-start space-x-3 rounded-xl border border-red-500/20 bg-white/5 p-4 backdrop-blur-xl"
              >
                <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                <p className="text-red-300">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
};

export default QRCodeGenerator;

import React, { useState, useCallback, useRef } from 'react';
import { 
  ArrowLeftIcon, 
  TrashIcon,
  SparklesIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { Button } from '@headlessui/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { formatFileSize } from '../../utils/formatFileSize';
import ImagePreviewCard from '../../components/ui/ImagePreviewCard';

interface ImageData {
  filename: string;
  originalUrl: string;
  originalSize: number;
  webpUrl: string;
  webpSize: number;
  reduction: number;
  error?: string;
}

const MAX_FILES = 20;

const WebPConverter = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [quality, setQuality] = useState<number>(80);
  const [globalError, setGlobalError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const convertToWebP = useCallback(async (file: File, qual: number): Promise<ImageData> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            return resolve({ filename: file.name, originalUrl: '', originalSize: 0, webpUrl: '', webpSize: 0, reduction: 0, error: 'Canvas not supported.' });
          }
          ctx.drawImage(img, 0, 0);
          try {
            const webpDataUrl = canvas.toDataURL('image/webp', qual / 100);
            const webpBlob = await (await fetch(webpDataUrl)).blob();
            const reduction = file.size > 0 ? ((file.size - webpBlob.size) / file.size * 100) : 0;
            resolve({
              filename: file.name.replace(/\.[^/.]+$/, '.webp'),
              originalUrl: e.target?.result as string,
              originalSize: file.size,
              webpUrl: webpDataUrl,
              webpSize: webpBlob.size,
              reduction,
            });
          } catch (err) {
            resolve({ filename: file.name, originalUrl: '', originalSize: 0, webpUrl: '', webpSize: 0, reduction: 0, error: 'Conversion failed.' });
          }
        };
        img.onerror = () => resolve({ filename: file.name, originalUrl: '', originalSize: 0, webpUrl: '', webpSize: 0, reduction: 0, error: 'Invalid image.' });
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve({ filename: file.name, originalUrl: '', originalSize: 0, webpUrl: '', webpSize: 0, reduction: 0, error: 'Read failed.' });
      reader.readAsDataURL(file);
    });
  }, []);

  const processFiles = useCallback(async (files: FileList, qual: number) => {
    setGlobalError('');
    const fileArray = Array.from(files).filter(f => ['image/jpeg', 'image/png'].includes(f.type));
    if (fileArray.length === 0) {
      setGlobalError('No valid JPG/PNG images selected.');
      return;
    }
    if (fileArray.length > MAX_FILES) {
      setGlobalError(`Exceeded limit: Only the first ${MAX_FILES} images will be processed.`);
      fileArray.splice(MAX_FILES);
    }
    setIsProcessing(true);
    setProgress(0);
    const results: ImageData[] = [];
    for (let i = 0; i < fileArray.length; i++) {
      const result = await convertToWebP(fileArray[i], qual);
      results.push(result);
      setProgress(((i + 1) / fileArray.length) * 100);
    }
    setImages(prev => [...prev, ...results]);
    setIsProcessing(false);
  }, [convertToWebP]);

  const reconvertAll = useCallback(async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    const newImages: ImageData[] = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i].error || !images[i].originalUrl) continue;
      const blob = await (await fetch(images[i].originalUrl)).blob();
      const file = new File([blob], images[i].filename.replace('.webp', ''), { type: blob.type });
      const result = await convertToWebP(file, quality);
      newImages.push(result);
      setProgress(((i + 1) / images.length) * 100);
    }
    setImages(newImages);
    setIsProcessing(false);
  }, [images, quality, convertToWebP]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files, quality);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files, quality);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const downloadSingle = (webpUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = webpUrl;
    link.download = filename;
    link.click();
  };

  const downloadAllAsZip = async () => {
    const zip = new JSZip();
    images.forEach((img) => {
      if (img.webpUrl) {
        const base64 = img.webpUrl.split(',')[1];
        zip.file(img.filename, base64, { base64: true });
      }
    });
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'webp-images.zip');
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setImages([]);
    setGlobalError('');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const totalSavings = images.reduce((acc, img) => acc + (img.originalSize - img.webpSize), 0);
  const avgReduction = images.length > 0 ? (images.reduce((acc, img) => acc + img.reduction, 0) / images.length) : 0;

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const buttonVariants: Variants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
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

      {/* Main Content */}
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
              WebP Converter
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Convert up to 20 JPG or PNG images to WebP format for optimized web performance with bulk upload support.
            </p>
          </div>

          {/* Info Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mb-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start space-x-3"
          >
            <InformationCircleIcon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">About WebP Converter</h3>
              <p className="text-gray-300">
                WebP provides superior compression. Upload multiple images (up to 20) for batch conversion and download as ZIP.
              </p>
            </div>
          </motion.div>

          {/* Image Upload Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`backdrop-blur-xl bg-white/5 border-2 ${isDragging ? 'border-cyan-500' : 'border-white/10'} rounded-2xl p-8 text-center transition-all duration-300`}
            >
              <input
                type="file"
                accept="image/jpeg,image/png"
                multiple
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                aria-label="Upload images"
              />
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 mb-4"
                >
                  Upload Images (up to 20)
                </Button>
              </motion.div>
              <p className="text-gray-300">or drag and drop JPG/PNG images here</p>
              <div className="mt-4">
                <label className="text-gray-300 block mb-2">Compression Quality: {quality}%</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
              {images.length > 0 && (
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="mt-4">
                  <Button
                    onClick={reconvertAll}
                    className="bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-400 hover:to-green-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40"
                  >
                    Reconvert with New Quality
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Progress Bar */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-cyan-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-center text-gray-300 mt-2">Processing...</p>
              </div>
            </motion.div>
          )}

          {/* Preview Grid */}
          {images.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Converted Images ({images.length})</h2>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    onClick={downloadAllAsZip}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  >
                    <DocumentArrowDownIcon className="w-5 h-5" />
                    <span>Download All as ZIP</span>
                  </Button>
                </motion.div>
              </div>
              <div className="mb-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-gray-300">
                Total Savings: {formatFileSize(totalSavings)} ({avgReduction.toFixed(1)}% avg)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto">
                <AnimatePresence>
                  {images.map((img, index) => (
                    <ImagePreviewCard
                      key={index}
                      img={img}
                      index={index}
                      onRemove={removeImage}
                      onDownload={downloadSingle}
                      buttonVariants={buttonVariants}
                      imageVariants={imageVariants}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Global Error Message */}
          <AnimatePresence>
            {globalError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-xl p-4 flex items-start space-x-3"
              >
                <ExclamationTriangleIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300">{globalError}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </div>
  );
};

export default WebPConverter;
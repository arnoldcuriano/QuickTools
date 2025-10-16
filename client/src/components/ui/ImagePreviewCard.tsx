import React from 'react';
import { Button } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import { DocumentArrowDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatFileSize } from '../../utils/formatFileSize';

interface ImageData {
  filename: string;
  originalUrl: string;
  originalSize: number;
  webpUrl: string;
  webpSize: number;
  reduction: number;
  error?: string;
}

interface ImagePreviewCardProps {
  img: ImageData;
  index: number;
  onRemove: (index: number) => void;
  onDownload: (webpUrl: string, filename: string) => void;
  buttonVariants: Variants;
  imageVariants: Variants;
}

const ImagePreviewCard: React.FC<ImagePreviewCardProps> = ({
  img,
  index,
  onRemove,
  onDownload,
  buttonVariants,
  imageVariants,
}) => {
  return (
    <motion.div
      key={index}
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.95 }}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 relative"
    >
      <motion.div 
        variants={buttonVariants} 
        whileHover="hover" 
        whileTap="tap"
        className="absolute top-2 right-2"
      >
        <Button
          onClick={() => onRemove(index)}
          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 p-1 rounded-full"
          aria-label={`Remove ${img.filename}`}
        >
          <XMarkIcon className="w-4 h-4" />
        </Button>
      </motion.div>
      <h3 className="text-sm font-medium text-white truncate">{img.filename}</h3>
      {img.error ? (
        <p className="text-red-300">{img.error}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-gray-400">Original</p>
              <img src={img.originalUrl} alt={`Original ${img.filename}`} className="max-h-32 object-contain" />
              <p className="text-xs text-gray-400">{formatFileSize(img.originalSize)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">WebP</p>
              <img src={img.webpUrl} alt={`WebP ${img.filename}`} className="max-h-32 object-contain" />
              <p className="text-xs text-gray-400">{formatFileSize(img.webpSize)}</p>
            </div>
          </div>
          <p className="text-xs text-green-400">Savings: {img.reduction.toFixed(1)}%</p>
          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              onClick={() => onDownload(img.webpUrl, img.filename)}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-3 py-1 rounded-lg text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
            >
              Download WebP
            </Button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default ImagePreviewCard;
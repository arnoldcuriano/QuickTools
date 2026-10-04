import React from 'react';
import { Button } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatFileSize } from '../../utils/formatFileSize';
import { ImageData } from '../../types/imageTools';

interface ImagePreviewCardProps {
  img: ImageData;
  index: number;
  onRemove: (index: number) => void;
  onDownload: (webpUrl: string, filename: string) => void;
}

const ImagePreviewCard: React.FC<ImagePreviewCardProps> = ({
  img,
  index,
  onRemove,
  onDownload,
}) => {
  return (
    <div
      key={index}
      className="tool-panel relative space-y-3 p-4"
    >
      <div className="absolute right-2 top-2">
        <Button
          onClick={() => onRemove(index)}
          className="brand-icon-button h-8 w-8"
          aria-label={`Remove ${img.filename}`}
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="truncate pr-10 text-sm font-medium text-brand">{img.filename}</h3>
      {img.error ? (
        <p className="border-l border-brand pl-3 text-sm text-brand">{img.error}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="font-mono text-xs text-brand-muted">Original</p>
              <img src={img.originalUrl} alt={`Original ${img.filename}`} className="max-h-32 object-contain" />
              <p className="font-mono text-xs text-brand-muted">{formatFileSize(img.originalSize)}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-brand-muted">WebP</p>
              <img src={img.webpUrl} alt={`WebP ${img.filename}`} className="max-h-32 object-contain" />
              <p className="font-mono text-xs text-brand-muted">{formatFileSize(img.webpSize)}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-brand">Savings: {img.reduction.toFixed(1)}%</p>
          <Button
            onClick={() => onDownload(img.webpUrl, img.filename)}
            className="brand-button w-full px-3 py-2 text-sm"
          >
            Download WebP
          </Button>
        </>
      )}
    </div>
  );
};

export default ImagePreviewCard;

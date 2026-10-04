import { useCallback, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { formatFileSize } from '../../utils/formatFileSize';
import type { ImageData } from '../../types/imageTools';
import { convertToWebP, createSourceFileFromImage, createWebPZip, getImageSavingsSummary, getSupportedImageFiles, MAX_WEBP_FILES } from '../../utils/webpConverter';
import { getTool } from '../../data/toolCatalog';
import { Button, Dropzone, Field, FileList, FileTool, SettingsPanel } from '../../components/ui/ToolPage';

const tool = getTool('webp-converter');

const WebPConverter = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [quality, setQuality] = useState(80);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(async (files: FileList, selectedQuality: number) => {
    setError('');
    const accepted = getSupportedImageFiles(files);
    if (!accepted.length) return setError('No valid JPG/PNG images selected.');
    if (accepted.length > MAX_WEBP_FILES) { setError(`Only the first ${MAX_WEBP_FILES} images will be processed.`); accepted.splice(MAX_WEBP_FILES); }
    setIsProcessing(true); setProgress(0);
    const results: ImageData[] = [];
    for (let index = 0; index < accepted.length; index += 1) {
      results.push(await convertToWebP(accepted[index], selectedQuality));
      setProgress(((index + 1) / accepted.length) * 100);
    }
    setImages((current) => [...current, ...results]); setIsProcessing(false);
  }, []);

  const reconvert = async () => {
    setIsProcessing(true); setProgress(0);
    const results: ImageData[] = [];
    for (let index = 0; index < images.length; index += 1) {
      if (!images[index].error && images[index].originalUrl) results.push(await convertToWebP(await createSourceFileFromImage(images[index]), quality));
      setProgress(((index + 1) / images.length) * 100);
    }
    setImages(results); setIsProcessing(false);
  };

  const clearAll = () => { setImages([]); setError(''); setProgress(0); if (inputRef.current) inputRef.current.value = ''; };
  const savings = getImageSavingsSummary(images);

  return <FileTool tool={tool} settings={<SettingsPanel>
    <Field label={`Quality ${quality}%`} hint="80% is a good balance of size and sharpness for most photos."><input type="range" min="10" max="100" value={quality} onChange={(event) => setQuality(Number(event.target.value))} /></Field>
    <Button variant="primary" onClick={reconvert} disabled={!images.length || isProcessing}>Convert images</Button>
    <Button variant="secondary" onClick={async () => saveAs(await createWebPZip(images), 'webp-images.zip')} disabled={!images.some((image) => image.webpUrl)}>Download all as ZIP</Button>
    <Button variant="ghost" onClick={clearAll} disabled={!images.length && !error}>Clear all</Button>
    <p className="tool-notice">{isProcessing ? `Processing ${Math.round(progress)}%` : images.length ? `${formatFileSize(savings.totalSavings)} saved (${savings.avgReduction.toFixed(1)}% average)` : 'Add images to get started.'}</p>
  </SettingsPanel>}>
    <Dropzone active={isDragging} onDrop={(event) => { event.preventDefault(); setIsDragging(false); void processFiles(event.dataTransfer.files, quality); }} onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)}>
      <div><strong>Drag and drop JPG or PNG images</strong><p>or</p><input ref={inputRef} type="file" accept="image/jpeg,image/png" multiple hidden aria-label="Upload images" onChange={(event) => event.target.files && void processFiles(event.target.files, quality)} /><Button variant="secondary" onClick={() => inputRef.current?.click()}>Choose images</Button><p className="tool-notice">Up to 20 files. Images never leave your device.</p></div>
    </Dropzone>
    {error && <p className="tool-notice" role="alert">{error}</p>}
    <FileList>{images.map((image, index) => <div className="output-block" key={`${image.filename}-${index}`}><div className="output-block-header"><strong>{image.filename}</strong><Button variant="ghost" onClick={() => setImages((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Remove</Button></div>{image.error ? <p className="tool-notice">{image.error}</p> : <><div className="image-preview-grid"><figure><figcaption>Original · {formatFileSize(image.originalSize)}</figcaption><img src={image.originalUrl} alt={`Original ${image.filename}`} /></figure><figure><figcaption>WebP · {formatFileSize(image.webpSize)}</figcaption><img src={image.webpUrl} alt={`WebP ${image.filename}`} /></figure></div><div className="tool-actions"><span>{image.reduction.toFixed(1)}% smaller</span><Button variant="secondary" onClick={() => { const link = document.createElement('a'); link.href = image.webpUrl; link.download = image.filename; link.click(); }}>Download WebP</Button></div></>}</div>)}</FileList>
  </FileTool>;
};

export default WebPConverter;

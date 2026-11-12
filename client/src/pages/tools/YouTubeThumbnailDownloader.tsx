import { useState } from 'react';
import { getTool } from '../../data/toolCatalog';
import { parseYouTubeVideoId, youtubeThumbnailUrl } from '../../utils/youtubeThumbnail';
import { Button, Field, GeneratorTool, SettingsPanel } from '../../components/ui/ToolPage';

const tool = getTool('youtube-thumbnail-downloader');
const thumbnailSizes = [
  { id: 'maxresdefault', label: 'Maximum resolution', expected: '1280 x 720' },
  { id: 'sddefault', label: 'Standard definition', expected: '640 x 480' },
  { id: 'hqdefault', label: 'High quality', expected: '480 x 360' },
  { id: 'mqdefault', label: 'Medium quality', expected: '320 x 180' },
  { id: 'default', label: 'Default', expected: '120 x 90' },
] as const;

type ThumbnailSize = (typeof thumbnailSizes)[number];
type LoadState = 'loading' | 'available' | 'unavailable';

const downloadBlob = (blob: Blob, filename: string) => {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
};

const ThumbnailResult = ({ videoId, size }: { videoId: string; size: ThumbnailSize }) => {
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [dimensions, setDimensions] = useState('');
  const [message, setMessage] = useState('');
  const url = youtubeThumbnailUrl(videoId, size.id);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(url);
    setMessage('Image URL copied.');
  };

  const download = async () => {
    setMessage('');
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`YouTube returned ${response.status}.`);
      downloadBlob(await response.blob(), `${videoId}-${size.id}.jpg`);
      setMessage('Thumbnail downloaded.');
    } catch {
      window.open(url, '_blank', 'noopener,noreferrer');
      setMessage('The image opened in a new tab. Use your browser to save it.');
    }
  };

  return <section className="output-block">
    <div className="output-block-header">
      <h2>{size.label}</h2>
      <span className="ui-field-value">{dimensions || size.expected}</span>
    </div>
    <div className="api-image-preview">
      {loadState === 'loading' && <p className="tool-notice" role="status">Checking availability...</p>}
      {loadState !== 'unavailable' && <img
        src={url}
        alt={`${size.label} YouTube thumbnail`}
        hidden={loadState !== 'available'}
        onLoad={(event) => {
          setDimensions(`${event.currentTarget.naturalWidth} x ${event.currentTarget.naturalHeight}`);
          setLoadState('available');
        }}
        onError={() => setLoadState('unavailable')}
      />}
      {loadState === 'unavailable' && <p className="tool-notice">Not available for this video</p>}
      {loadState === 'available' && <div className="tool-actions">
        <Button variant="secondary" onClick={() => void download()}>Download</Button>
        <Button variant="ghost" data-sound="copied" onClick={() => void copyUrl()}>Copy image URL</Button>
      </div>}
      {message && <p className="tool-notice" role="status">{message}</p>}
    </div>
  </section>;
};

const YouTubeThumbnailDownloader = () => {
  const [input, setInput] = useState('');
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState('');

  const findThumbnails = () => {
    const result = parseYouTubeVideoId(input);
    if (result.startsWith('Error:')) {
      setVideoId('');
      setError(result);
      return;
    }
    setError('');
    setVideoId(result);
  };

  const clear = () => {
    setInput('');
    setVideoId('');
    setError('');
  };

  return <GeneratorTool
    tool={tool}
    activityLabel="Loads images from YouTube's servers"
    settings={<SettingsPanel>
      <p className="tool-notice">Loads images from YouTube's servers.</p>
      <p className="tool-notice">Thumbnails belong to their creators. Use them only where you have permission. This tool does not download videos.</p>
      <Button variant="ghost" onClick={clear} disabled={!input && !videoId}>Clear</Button>
    </SettingsPanel>}
  >
    <section className="request-builder" aria-labelledby="thumbnail-request-title">
      <div className="output-block-header"><h2 id="thumbnail-request-title">Video</h2></div>
      <div className="request-builder-content">
        <Field label="YouTube URL or video ID">
          <input
            className="ui-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter') findThumbnails(); }}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </Field>
        <Button variant="primary" onClick={findThumbnails}>Find thumbnails</Button>
        {error && <p className="tool-notice" role="alert">{error}</p>}
      </div>
    </section>
    {videoId && <div className="file-list" aria-live="polite">
      {thumbnailSizes.map((size) => <ThumbnailResult key={`${videoId}-${size.id}`} videoId={videoId} size={size} />)}
    </div>}
  </GeneratorTool>;
};

export default YouTubeThumbnailDownloader;

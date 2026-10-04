import { useCallback, useEffect, useRef, useState } from 'react';
import { getTool } from '../../data/toolCatalog';
import { BLACK, WHITE } from '../../data/designTokens';
import { generatePremiumQrCodeDataUrl, type QrErrorCorrectionLevel } from '../../utils/qrCode';
import { Button, DataTool, Field, OutputBlock, SettingsPanel, TextInput } from '../../components/ui/ToolPage';

const tool = getTool('qr-code-generator');
const QRCodeGenerator = () => {
  const [content, setContent] = useState('https://quicktools.dev');
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [level, setLevel] = useState<QrErrorCorrectionLevel>('M');
  const [foreground, setForeground] = useState(BLACK);
  const [background, setBackground] = useState(WHITE);
  const [frameText, setFrameText] = useState('Scan to open');
  const [logo, setLogo] = useState('');
  const [logoScale, setLogoScale] = useState(22);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => { setContent('https://quicktools.dev'); setSize(320); setMargin(2); setLevel('M'); setForeground(BLACK); setBackground(WHITE); setFrameText('Scan to open'); setLogo(''); setLogoScale(22); setError(''); if (fileRef.current) fileRef.current.value = ''; }, []);

  useEffect(() => {
    let cancelled = false;
    if (!content.trim()) return;
    generatePremiumQrCodeDataUrl(content.trim(), { size, margin, errorCorrectionLevel: level, darkColor: foreground, lightColor: background, logoDataUrl: logo || null, logoScale: logoScale / 100, frameText })
      .then((value) => { if (!cancelled) { setPreview(value); setError(''); } })
      .catch((reason) => { if (!cancelled) { setPreview(''); setError(reason instanceof Error ? reason.message : 'QR generation failed.'); } });
    return () => { cancelled = true; };
  }, [background, content, foreground, frameText, level, logo, logoScale, margin, size]);

  const handleLogo = (file?: File) => { if (!file) return; if (!file.type.startsWith('image/')) return setError('Logo uploads must be image files.'); const reader = new FileReader(); reader.onload = () => setLogo(String(reader.result ?? '')); reader.onerror = () => setError('Failed to read logo image.'); reader.readAsDataURL(file); };
  const download = () => { if (!preview) return; const link = document.createElement('a'); link.href = preview; link.download = 'quicktools-qr.png'; link.click(); };

  return <DataTool tool={tool} settings={<SettingsPanel>
    <Field label={`Size ${size}px`}><input type="range" min="160" max="640" step="40" value={size} onChange={(event) => setSize(Number(event.target.value))} /></Field>
    <Field label={`Margin ${margin}`}><input type="range" min="0" max="8" value={margin} onChange={(event) => setMargin(Number(event.target.value))} /></Field>
    <Field label="Error correction"><select value={level} onChange={(event) => setLevel(event.target.value as QrErrorCorrectionLevel)}>{['L', 'M', 'Q', 'H'].map((value) => <option key={value}>{value}</option>)}</select></Field>
    <Field label="Foreground"><input className="ui-input" type="color" value={foreground} onChange={(event) => setForeground(event.target.value)} /></Field>
    <Field label="Background"><input className="ui-input" type="color" value={background} onChange={(event) => setBackground(event.target.value)} /></Field>
    <Field label="Frame text"><input className="ui-input" value={frameText} onChange={(event) => setFrameText(event.target.value)} /></Field>
    <Field label={`Logo scale ${logoScale}%`}><input type="range" min="10" max="35" value={logoScale} onChange={(event) => setLogoScale(Number(event.target.value))} /></Field>
    <input ref={fileRef} type="file" accept="image/*" hidden onChange={(event) => handleLogo(event.target.files?.[0])} /><Button variant="secondary" onClick={() => fileRef.current?.click()}>Choose logo</Button>
    <Button variant="primary" onClick={download} disabled={!preview}>Download PNG</Button><Button variant="ghost" onClick={reset}>Reset</Button>
  </SettingsPanel>}>
    <Field label="QR content" hint={`${content.length} characters`}><TextInput value={content} onChange={(event) => { setContent(event.target.value); if (!event.target.value.trim()) { setPreview(''); setError(''); } }} /></Field>
    <OutputBlock label="Preview" value={preview}>{preview ? <img src={preview} alt="Generated QR code preview" /> : <p className="tool-notice">Enter content to generate a QR code.</p>}</OutputBlock>
    {error && <p className="tool-notice" role="alert">{error}</p>}
  </DataTool>;
};

export default QRCodeGenerator;

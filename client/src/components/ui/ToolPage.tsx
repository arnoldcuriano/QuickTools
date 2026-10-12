import type { ButtonHTMLAttributes, CSSProperties, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import type { ToolCatalogItem } from '../../data/toolCatalog';
import AppHeader from './AppHeader';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export const Button = ({ variant = 'secondary', className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) => (
  <button className={`ui-button ui-button-${variant} ${className}`} {...props} />
);

export const Field = ({ label, value, hint, children }: { label: string; value?: ReactNode; hint?: ReactNode; children: ReactNode }) => (
  <label className="ui-field">
    <span className="ui-field-header"><span className="ui-field-label">{label}</span>{value !== undefined && <span className="ui-field-value">{value}</span>}</span>
    {children}
    {hint && <span className="ui-field-hint">{hint}</span>}
  </label>
);

export const Slider = ({ value, min = 0, max = 100, ...props }: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { value: number; min?: number; max?: number }) => {
  const percentage = ((value - Number(min)) / (Number(max) - Number(min))) * 100;
  return <span className="slider-control" style={{ '--slider-value': `${percentage}%` } as CSSProperties}>
    <span className="slider-track" aria-hidden="true"><span className="slider-fill" /></span>
    <input {...props} type="range" min={min} max={max} value={value} />
  </span>;
};

export const SettingsPanel = ({ title = 'Settings', children }: { title?: string; children: ReactNode }) => (
  <aside className="settings-panel" aria-label={title}>
    <h2>{title}</h2>
    <div className="settings-panel-content">{children}</div>
  </aside>
);

export const TextInput = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea {...props} className={`text-input ${props.className ?? ''}`} />
);

export const OutputBlock = ({ value, label = 'Output', onCopy, children }: { value: string; label?: string; onCopy?: () => void; children?: ReactNode }) => (
  <section className="output-block">
    <div className="output-block-header">
      <h2>{label}</h2>
      {onCopy && <Button variant="ghost" data-sound="copied" onClick={onCopy} disabled={!value}><ClipboardDocumentIcon aria-hidden="true" />Copy</Button>}
    </div>
    {children ?? <pre tabIndex={0}>{value || 'Output appears here.'}</pre>}
  </section>
);

export const Dropzone = ({ active = false, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { active?: boolean }) => (
  <div {...props} className={`dropzone ${active ? 'is-active' : ''} ${props.className ?? ''}`}>{children}</div>
);

export const FileList = ({ children, empty = 'No files selected.' }: { children?: ReactNode; empty?: string }) => (
  <div className="file-list">{children || <p>{empty}</p>}</div>
);

export const ToolPage = ({ tool, settings, activityLabel = 'Runs locally in your browser', children }: { tool: ToolCatalogItem; settings?: ReactNode; activityLabel?: ReactNode; children: ReactNode }) => (
  <div className="tool-page">
    <AppHeader />
    <main className="tool-shell">
      <div className="tool-kicker"><Link to="/">Back to tools</Link><span>{activityLabel}</span></div>
      <h1>{tool.name}</h1>
      <p className="tool-description">{tool.description}</p>
      <div className="tool-divider" />
      <div className={`tool-layout ${settings ? '' : 'tool-layout-single'}`}>
        <div className="tool-main">{children}</div>
        {settings}
      </div>
    </main>
    <footer className="tool-footer"><div className="tool-shell">QuickTools runs in your browser. Your files stay on your device.</div></footer>
  </div>
);

type TemplateProps = { tool: ToolCatalogItem; settings?: ReactNode; activityLabel?: ReactNode; children: ReactNode };
export const FileTool = (props: TemplateProps) => <ToolPage {...props} />;
export const TextTool = (props: TemplateProps) => <ToolPage {...props} />;
export const DataTool = (props: TemplateProps) => <ToolPage {...props} />;

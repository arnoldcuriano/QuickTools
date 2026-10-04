import { toolCatalog } from '../data/toolCatalog';
import { Button, DataTool, Dropzone, Field, FileList, FileTool, OutputBlock, SettingsPanel, TextInput, TextTool } from '../components/ui/ToolPage';

const demos = [
  { Template: FileTool, tool: toolCatalog.find((item) => item.template === 'file')! },
  { Template: TextTool, tool: toolCatalog.find((item) => item.template === 'text')! },
  { Template: DataTool, tool: toolCatalog.find((item) => item.template === 'data')! },
];

const KitchenSink = () => <>{(['light', 'dark'] as const).map((theme) => <section key={theme} data-theme={theme} aria-label={`${theme} component examples`}>
  {demos.map(({ Template, tool }) => <Template key={`${theme}-${tool.id}`} tool={tool} settings={<SettingsPanel><Field label="Example field" hint="Shared field guidance"><input className="ui-input" defaultValue="Setting" /></Field><Button variant="primary">Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button></SettingsPanel>}>
    {tool.template === 'file' ? <><Dropzone>Shared dropzone</Dropzone><FileList><p>example.png</p></FileList></> : <div className="input-output-grid"><Field label="Input"><TextInput defaultValue="Shared monospace input" /></Field><OutputBlock value="Shared monospace output" onCopy={() => undefined} /></div>}
  </Template>)}
</section>)}</>;

export default KitchenSink;

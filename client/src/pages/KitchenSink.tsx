import { toolCatalog, type ToolTemplate } from '../data/toolCatalog';
import { Button, CalculatorTool, DataTool, Dropzone, Field, FileList, FileTool, GeneratorTool, OutputBlock, ReferenceTool, SettingsPanel, TextInput, TextTool } from '../components/ui/ToolPage';

const templates = { F: FileTool, T: TextTool, D: DataTool, C: CalculatorTool, G: GeneratorTool, R: ReferenceTool };
const demos = (Object.keys(templates) as ToolTemplate[]).map((code) => ({ code, Template: templates[code], tool: toolCatalog.find((item) => item.template === code) ?? toolCatalog[0] }));

const KitchenSink = () => <>{(['light', 'dark'] as const).map((theme) => <section key={theme} data-theme={theme} aria-label={`${theme} component examples`}>
  {demos.map(({ code, Template, tool }) => <Template key={`${theme}-${code}`} tool={tool} settings={<SettingsPanel><Field label="Example field" hint="Shared field guidance"><input className="ui-input" defaultValue="Setting" /></Field><Button variant="primary">Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button></SettingsPanel>}>
    {code === 'F' ? <><Dropzone>Shared dropzone</Dropzone><FileList><p>example.png</p></FileList></> : <div className="input-output-grid"><Field label="Input"><TextInput defaultValue="Shared monospace input" /></Field><OutputBlock value="Shared monospace output" onCopy={() => undefined} /></div>}
  </Template>)}
</section>)}</>;

export default KitchenSink;

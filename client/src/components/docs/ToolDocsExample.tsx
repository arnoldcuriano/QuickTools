import { useState } from 'react';
import type { ToolModule } from '../../tools/types';

const modules = import.meta.glob<ToolModule>('../../tools/*/index.ts');

const ToolDocsExample = ({ toolId }: { toolId: string }) => {
  const [example, setExample] = useState<{ name: string; input: unknown; options?: unknown } | null>(null);
  const load = async () => {
    const module = await modules[`../../tools/${toolId}/index.ts`]?.();
    const first = module?.examples[0];
    if (first) setExample({ name: first.name, input: first.input, options: first.options });
  };

  if (!example) return <button className="ui-button ui-button-ghost" type="button" onClick={() => void load()}>Show example</button>;
  return <div><h3>{example.name}</h3><pre tabIndex={0}><code>{JSON.stringify({ input: example.input, options: example.options }, null, 2)}</code></pre></div>;
};

export default ToolDocsExample;

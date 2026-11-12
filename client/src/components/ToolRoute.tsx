import { createElement, lazy, Suspense, type ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { publishedTools } from '../generated/toolRegistry';
import type { ToolModule } from '../tools/types';

const modules = import.meta.glob<ToolModule>('../tools/*/index.ts');
const pages = new Map<string, ReactNode>(publishedTools.map((tool) => {
  const load = modules[`../tools/${tool.id}/index.ts`];
  const Page = load ? lazy(async () => ({ default: (await load()).Page })) : null;
  return [tool.id, Page ? <Suspense fallback={<main className="tool-shell"><p role="status">Loading tool...</p></main>}>{createElement(Page)}</Suspense> : null] as const;
}));

const ToolRoute = () => {
  const { toolId } = useParams();
  const page = toolId ? pages.get(toolId) : null;
  if (toolId === 'base64') return <Navigate to="/tools/base64-encoder-decoder" replace />;
  if (!page) return <Navigate to="/" replace />;
  return page;
};

export default ToolRoute;

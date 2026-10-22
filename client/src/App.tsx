import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { installSoundDelegation } from './utils/sound';
import ToolRoute from './components/ToolRoute';
import CommandPalette from './components/CommandPalette';

const KitchenSink = lazy(() => import('./pages/KitchenSink'));
const Docs = lazy(() => import('./pages/Docs'));

function App() {
  useEffect(() => installSoundDelegation(), []);

  return (
    <Router>
      <div className="App">
        <CommandPalette />
        <Suspense
          fallback={
            <main className="brand-page flex min-h-screen items-center justify-center">
              <p role="status" className="text-sm text-brand-muted">
                Loading tool...
              </p>
            </main>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/tools/:toolId" element={<ToolRoute />} />
            <Route path="/kitchen-sink" element={<KitchenSink />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

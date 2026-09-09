import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const Base64Tool = lazy(() => import('./pages/tools/Base64Tool'));
const TextFormatter = lazy(() => import('./pages/tools/TextFormatter'));
const WebPConverter = lazy(() => import('./pages/tools/WebPConverter'));
const JSONConverter = lazy(() => import('./pages/tools/JSONConverter'));
const QRCodeGenerator = lazy(() => import('./pages/tools/QRCodeGenerator'));
const JSONCompare = lazy(() => import('./pages/tools/JSONCompare'));
const CSVTSVConverter = lazy(() => import('./pages/tools/CSVTSVConverter'));
const RegexTester = lazy(() => import('./pages/tools/RegexTester'));

function App() {
  return (
    <Router>
      <div className="App">
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
            <Route path="/tools/base64" element={<Base64Tool />} />
            <Route path="/tools/text-formatter" element={<TextFormatter />} />
            <Route path="/tools/webp-converter" element={<WebPConverter />} />
            <Route path="/tools/json-converter" element={<JSONConverter />} />
            <Route path="/tools/qr-code-generator" element={<QRCodeGenerator />} />
            <Route path="/tools/json-compare" element={<JSONCompare />} />
            <Route path="/tools/csv-tsv-converter" element={<CSVTSVConverter />} />
            <Route path="/tools/regex-tester" element={<RegexTester />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;

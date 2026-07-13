import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Base64Tool from './pages/tools/Base64Tool';
import TextFormatter from './pages/tools/TextFormatter';
import WebPConverter from './pages/tools/WebPConverter';
import JSONConverter from './pages/tools/JSONConverter';
import QRCodeGenerator from './pages/tools/QRCodeGenerator';
import JSONCompare from './pages/tools/JSONCompare';
import CSVTSVConverter from './pages/tools/CSVTSVConverter';
import RegexTester from './pages/tools/RegexTester';

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;

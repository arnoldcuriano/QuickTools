import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Base64Tool from './pages/tools/Base64Tool';
import TextFormatter from './pages/tools/TextFormatter';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/base64" element={<Base64Tool />} />
          <Route path="/tools/text-formatter" element={<TextFormatter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
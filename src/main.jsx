import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import PdfViewer from './components/Pdf'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="/pdf" element={<PdfViewer />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)

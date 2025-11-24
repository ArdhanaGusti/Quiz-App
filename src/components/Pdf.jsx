import React from "react";

const PdfViewer = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6 tracking-widest">
        DOCUMENT VIEWER
      </h1>

      <div className="w-full max-w-5xl h-[85vh] border-2 border-cyan-500 rounded-xl overflow-hidden shadow-lg shadow-cyan-900/50">
        <iframe
          src="/Deploy to Production.pdf"
          title="PDF Document"
          width="100%"
          height="100%"
          className="bg-gray-900"
        />
      </div>

      <p className="mt-4 text-gray-400 text-sm">
        Press ESC to exit fullscreen or scroll to navigate the PDF
      </p>
    </div>
  );
};

export default PdfViewer;

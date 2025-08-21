// PdfViewer.tsx
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker (Vite compatible)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PdfViewer: React.FC<{ fileUrl: string }> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="shadow-lg rounded-md"
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;

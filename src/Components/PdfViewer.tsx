// PdfViewer.tsx
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set PDF.js worker dynamically (Vite-friendly)
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
    <div>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageNumber} of {numPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages))}
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;

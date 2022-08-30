import React, { useEffect, useState, useRef } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

const PdfViewer = ({ src, height = 500, onLoadPdf }) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const canvasRef = useRef(null);

	const removeUnusedAttr = () => {
		if (canvasRef.current) {
			let { current } = canvasRef;
			current.classList.add("mw-100");
			current.style.removeProperty("height");
			current.style.removeProperty("width");
		}
	};

	return (
		<>
			<Document file={src} loading={() => onLoadPdf()} onLoadSuccess={({ numPages }) => setNumPages(numPages)} onLoadError={(e) => console.log("PDF error", e.message)}>
				<Page onRenderSuccess={() => removeUnusedAttr()} canvasRef={canvasRef} pageNumber={pageNumber} />
			</Document>
			<div className='d-flex justify-content-between align-items-center mt-2'>
				<div className='page-of-pdf'>
					Page {pageNumber} of {numPages}
				</div>
				<div>
					<button onClick={() => setPageNumber(pageNumber - 1)} className='btn btn-outline-primary btn-sm' disabled={pageNumber === 1}>
						Previous
					</button>
					<button onClick={() => setPageNumber(pageNumber + 1)} className='btn btn-outline-primary btn-sm ms-2' disabled={pageNumber === numPages}>
						Next
					</button>
				</div>
			</div>
		</>
	);
};

export default PdfViewer;

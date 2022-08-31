import React, { useEffect, useState, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import Loading from './Loading';

const PdfViewer = ({ src, height = 600, onLoadPdf = () => <Loading />, onClose }) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [successRender, setSuccessRender] = useState(false);
	const canvasRef = useRef(null);

	useEffect(() => {
		removeUnusedAttr();
		return () => {
			setNumPages(null);
			setPageNumber(1);
		};
	}, []);

	const removeUnusedAttr = () => {
		if (canvasRef.current) {
			let { current } = canvasRef;
			current.classList.add('mw-100');
			// current.style.removeProperty("height");
			// current.style.removeProperty("width");
		}
	};

	return (
		<>
			<div className='modal-content'>
				<div className='d-flex justify-content-end'>
					<button
						type='button'
						onClick={() => onClose()}
						className='btn-close mt-3 me-3'
						style={{ height: '0.4em', width: '0.4em' }}
						data-bs-dismiss='modal'
						aria-label='Close'></button>
				</div>
				<Document file={src} loading={() => onLoadPdf()} onLoadSuccess={({ numPages }) => setNumPages(numPages)} onLoadError={(e) => console.log('PDF error', e.message)}>
					<Page height={height} onRenderSuccess={() => setSuccessRender(true)} className='d-flex justify-content-center' canvasRef={canvasRef} pageNumber={pageNumber} />
				</Document>
				<div className='d-flex justify-content-between align-items-center ms-3 me-3 mb-3'>
					{successRender && (
						<>
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
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default PdfViewer;

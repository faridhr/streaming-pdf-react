import React from "react";

const Modal = ({ children, hideFooter = false, modalTitle = "" }) => {
	return (
		<div className='modal-content'>
			<div className='modal-header'>
				<h5 className='modal-title'>{modalTitle}</h5>
				<button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
			</div>
			<div className='modal-body'>{children}</div>
			{!hideFooter && (
				<>
					<div className='modal-footer'>
						<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
							Close
						</button>
						<button type='button' className='btn btn-primary'>
							Save changes
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default Modal;

import React from 'react';
import ReactDOM from 'react-dom';

const Modal: React.FC = ({ children }) => {
	return ReactDOM.createPortal(
		<div className='modal'>{children}</div>,
		document.body
	);
};

export default Modal;

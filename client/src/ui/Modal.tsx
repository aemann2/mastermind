import React from 'react';
import ReactDOM from 'react-dom';
interface IProps {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<IProps> = ({ isOpen, setIsOpen, children }) => {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className='modal'>{children}</div>,
		document.body
	);
};

export default Modal;

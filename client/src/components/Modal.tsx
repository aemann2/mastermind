import React from 'react';
import ReactDOM from 'react-dom';
interface IProps {
	message: string;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<IProps> = ({ message, isOpen, setIsOpen }) => {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<div className='modal'>
			<span className='message'>{message}</span>
			<button onClick={() => setIsOpen((prev) => !prev)}>Close</button>
		</div>,
		document.body
	);
};

export default Modal;

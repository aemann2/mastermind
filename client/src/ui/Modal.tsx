import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../styles/Modal.module.scss';

const Modal: React.FC = ({ children }) => {
	return ReactDOM.createPortal(
		<>
			<div className={styles.modalOverlay}></div>
			<div className={styles.modal}>{children}</div>
		</>,
		document.body
	);
};

export default Modal;

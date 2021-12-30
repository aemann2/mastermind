import Modal from '../ui/Modal';

interface IProps {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructionsModal: React.FC<IProps> = ({ children, setModalOpen }) => {
	return (
		<Modal>
			{children}
			<button onClick={() => setModalOpen((prev) => !prev)}>Close</button>
		</Modal>
	);
};

export default InstructionsModal;

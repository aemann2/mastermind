import Modal from '../ui/Modal';

interface IProps {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	resetGame: () => void;
}

const GameEndModal: React.FC<IProps> = ({ children, resetGame }) => {
	return (
		<Modal>
			{children} <button onClick={resetGame}>Close</button>
		</Modal>
	);
};

export default GameEndModal;

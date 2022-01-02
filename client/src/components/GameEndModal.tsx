import Modal from '../ui/Modal';

interface IProps {
	resetGame: () => void;
	gameEndModalOpen: boolean;
}

const GameEndModal: React.FC<IProps> = ({
	children,
	resetGame,
	gameEndModalOpen,
}) => {
	return (
		<>
			{gameEndModalOpen && (
				<Modal>
					{children} <button onClick={resetGame}>Close</button>
				</Modal>
			)}
		</>
	);
};

export default GameEndModal;

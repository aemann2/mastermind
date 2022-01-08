import Modal from '../ui/Modal';
import styles from '../styles/GameEndModal.module.scss';

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
					<div className={styles.modal}>
						{children}
						<button onClick={resetGame}>Close</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default GameEndModal;

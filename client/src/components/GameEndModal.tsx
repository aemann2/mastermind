import Modal from '../ui/Modal';
import Button from '../ui/Button';
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
						<Button onClick={resetGame}>Close</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default GameEndModal;

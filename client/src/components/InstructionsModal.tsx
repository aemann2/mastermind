import Modal from '../ui/Modal';
import Button from '../ui/Button';
import styles from '../styles/InstructionsModal.module.scss';

interface IProps {
	instructionModalOpen: boolean;
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructionsModal: React.FC<IProps> = ({
	instructionModalOpen,
	setInstructionModalOpen,
}) => {
	const closeModal = () => {
		setInstructionModalOpen((prev) => !prev);
	};

	return (
		<>
			{instructionModalOpen && (
				<Modal>
					<div className={styles.modalText}>
						<h3>Welcome to Mastermind!</h3>
						<h4>Here's how to play:</h4>
						<ul className={styles.rulesList}>
							<li>
								There's a <span className={styles.bold}>mystery sequence</span>{' '}
								of 4 numbers. Your job is to guess what the sequence is within
								10 tries.
							</li>
							<li>
								Enter a number (0 - 7) in each box to make a guess at the
								mystery sequence. Hit 'Submit' to check your guess.
							</li>
							<li>
								The <span className={styles.bold}>'N'</span> count is the number
								of digits in your guess that are present in the mystery
								sequence.
							</li>
							<li>
								The <span className={styles.bold}>'L'</span> count is the number
								of digits in your guess that are in the right position. (If a
								number is in the <span className={styles.bold}>'L'</span> count,
								it is not included in the{' '}
								<span className={styles.bold}>'N'</span> count.)
							</li>
						</ul>
						<Button onClick={closeModal}>Close</Button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default InstructionsModal;

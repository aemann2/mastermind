import Modal from '../ui/Modal';

interface IProps {
	instructionModalOpen: boolean;
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructionsModal: React.FC<IProps> = ({
	instructionModalOpen,
	setInstructionModalOpen,
}) => {
	return (
		<>
			{instructionModalOpen && (
				<Modal>
					<div>
						<p>Welcome to Mastermind! Here's how to play:</p>
						<ul>
							<li>
								There's a mystery sequence of 4 numbers. Your job is to guess
								what the sequence is within 10 tries.
							</li>
							<li>
								Enter a number in each box to make a guess at the mystery
								sequence. Hit 'Submit' to check your guess.
							</li>
							<li>
								The 'N' count is the number of digits in your guess that are
								present in the mystery sequence.
							</li>
							<li>
								The 'L' count is the number of digits in your guess that are in
								the right position. (If a number is in the 'L' count, it is not
								included in the 'N' count.)
							</li>
						</ul>
					</div>
					<button onClick={() => setInstructionModalOpen((prev) => !prev)}>
						Close
					</button>
				</Modal>
			)}
		</>
	);
};

export default InstructionsModal;

import Modal from '../ui/Modal';

interface IProps {
	instructionModalOpen: boolean;
	setInstructionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructionsModal: React.FC<IProps> = ({
	children,
	instructionModalOpen,
	setInstructionModalOpen,
}) => {
	return (
		<>
			{instructionModalOpen && (
				<Modal>
					{children}
					<button onClick={() => setInstructionModalOpen((prev) => !prev)}>
						Close
					</button>
				</Modal>
			)}
		</>
	);
};

export default InstructionsModal;

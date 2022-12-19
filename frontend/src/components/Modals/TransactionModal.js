import { styled } from '@mui/material/styles';
import { useAuth0 } from '@auth0/auth0-react';
import TransactionFormContainer from '../Transactions/Form/TransactionFormContainer';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const TransactionModal = ({ handleClose, open, setOpen }) => {
	const { isAuthenticated } = useAuth0();

	return (
		<StyledModal
			// keepMounted
			open={open}
			onClose={handleClose}
			aria-labelledby='keep-mounted-modal-title'
			aria-describedby='keep-mounted-modal-description'
		>
			<StyledBox>
				{isAuthenticated && (
					<TransactionFormContainer
						open={open}
						setOpen={setOpen}
						handleClose={handleClose}
					/>
				)}
			</StyledBox>
		</StyledModal>
	);
};

export default TransactionModal;

const StyledModal = styled(Modal)`
	padding: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledBox = styled(Box)`
	max-width: 336px;
	width: 100%;
	background-color: var(--wave-color-5);
	border-radius: 1rem;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

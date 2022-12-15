import React from 'react';
import { StyledBtnDiv } from '../../../styles/StyledTransactionForm';

const ButtonContainer = ({ handleClose }) => {
	return (
		<StyledBtnDiv>
			<button type='submit'>Add Purchase</button>
			<button
				onClick={(e) => {
					e.preventDefault();
					handleClose();
				}}
			>
				Cancel
			</button>
		</StyledBtnDiv>
	);
};

export default ButtonContainer;

import React from 'react';
import styled from 'styled-components';
import useDebounce from '../../../hooks/useDebounce';
import { useTransactionContext } from '../../../hooks/useTransactionHook';

const StartTracking = () => {
	const { setOpenForm } = useTransactionContext();
	return (
		<StyledContainer>
			<h1>Ready to track your income?</h1>
			<button onClick={useDebounce(() => setOpenForm(true))}>Click Here</button>
		</StyledContainer>
	);
};

export default StartTracking;

const StyledContainer = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 16px;
	text-align: center;
	width: 100%;
	padding: 0 24px;

	h1 {
		font-size: 50px;
	}
	h2 {
		font-size: 32px;
	}
	button {
		margin-top: 32px;
		font-size: 24px;
		padding: 16px;
		width: 100%;
		max-width: 327px;
	}
`;

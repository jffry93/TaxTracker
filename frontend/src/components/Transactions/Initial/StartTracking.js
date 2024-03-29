import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import useDebounce from '../../../hooks/useDebounce';
import { useTransactionContext } from '../../../hooks/useTransactionHook';
import { pageAnimation } from '../../../styles/StyledAnimations';

const StartTracking = () => {
	const { setOpenForm } = useTransactionContext();
	return (
		<StyledContainer variants={pageAnimation} initial='hidden' animate='show'>
			<h1>Ready to track your income?</h1>
			<button onClick={useDebounce(() => setOpenForm(true))}>
				Press me 👇🏼
			</button>
		</StyledContainer>
	);
};

export default StartTracking;

const StyledContainer = styled(motion.div)`
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
		font-size: 48px;
	}
	h2 {
		font-size: 32px;
	}
	button {
		margin-top: 36px;
		font-size: 20px;
		padding: 16px;
		width: 100%;
		max-width: 327px;
	}
`;

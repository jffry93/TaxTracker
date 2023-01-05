import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import LoadingSpinner from '../styles/LoadingSpinner';
import { pageAnimation } from '../styles/StyledAnimations';

const Loading = () => {
	return (
		<StyledLoading
			variants={pageAnimation}
			initial='hidden'
			animate='show'
			exit='exit'
		>
			<div className='container'>
				<h1>Loading</h1>
				<LoadingSpinner />
			</div>
		</StyledLoading>
	);
};

export default Loading;

const StyledLoading = styled(motion.div)`
	border: 1px solid green;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}
`;

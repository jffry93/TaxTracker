import styled from '@emotion/styled';
import React from 'react';
import LoadingSpinner from '../styles/LoadingSpinner';

const Loading = () => {
	return (
		<StyledLoading>
			<div className='container'>
				<h1>Loading</h1>
				<LoadingSpinner />
			</div>
		</StyledLoading>
	);
};

export default Loading;

const StyledLoading = styled.div`
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

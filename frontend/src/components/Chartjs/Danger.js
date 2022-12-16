import React from 'react';
import styled from 'styled-components';

const Danger = () => {
	return (
		<StyledTitle>
			<h1>
				😵😵‍💫<span>Get it</span>😵‍💫😵
			</h1>
			<h2>together!!</h2>
		</StyledTitle>
	);
};

export default Danger;

const StyledTitle = styled.div`
	position: relative;
	top: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;

	margin: 0 24px 16px;
	h1 {
		width: 100%;
		font-size: 42px;
		display: flex;
		justify-content: space-between;
	}
	h2 {
		font-size: 42px;
	}
`;

import React from 'react';
import styled from 'styled-components';

const Danger = () => {
	return (
		<StyledTitle>
			<h1>
				😵😵‍💫<span>Get it</span>😵‍💫😵
			</h1>
			<h2>together!!</h2>
			<p>She's gonna leave you!!</p>
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
		width: fit-content;
		font-size: clamp(32px, 10vw, 50px);

		display: flex;
		justify-content: space-between;
	}
	h2 {
		font-size: clamp(32px, 10vw, 50px);
	}
	p {
		margin-top: 32px;
	}
`;

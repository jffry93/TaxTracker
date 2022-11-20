import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

const SignUp = () => {
	const { loginWithRedirect, logout, isAuthenticated, loginWithPopup } =
		useAuth0();
	return (
		<StyledContainer>
			<StyledContext>
				<div>
					<StyledTitle>TAX TRACKER</StyledTitle>
					<h1>
						Click below <br />
						for instant <br /> access
					</h1>
				</div>
				<button
					onClick={() => {
						loginWithPopup();
					}}
				>
					SIGN UP
				</button>
			</StyledContext>
		</StyledContainer>
	);
};

export default SignUp;

const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	height: 100vh;
	border: 1px solid white;
	padding: 64px;

	/* background-color: var(--off-white); */
`;
const StyledContext = styled.div`
	height: 100%;
	max-height: 370px;
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: space-between;
`;

const StyledTitle = styled.h1`
	/* font-size: 60px; */
	font-size: clamp(3.125rem, 4vw, 60px);
	margin-bottom: 32px;
`;

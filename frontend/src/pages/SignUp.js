import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignUp = () => {
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
	return (
		<div>
			<h2>Join us...</h2>
			<button
				onClick={() => {
					loginWithRedirect();
				}}
			>
				Sign Up
			</button>
		</div>
	);
};

export default SignUp;

import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useContext } from 'react';
import { UserContext } from './context/UserContext';
import { TransactionContext } from './context/TransactionContext';
import InitialSetup from './pages/InitialSetup';

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { dispatch } = useContext(TransactionContext);
	const { userInfo, legitCheck, userDispatch } = useContext(UserContext);

	useEffect(() => {
		console.log(isAuthenticated);

		const fetchGetHandler = async () => {
			const res = await fetch('/api/user/', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-type': 'application/json',
				},
			});
			const data = await res.json();
			console.log(data);
			userDispatch({ type: 'LOG_ON', user: data.user });
		};
		isAuthenticated && fetchGetHandler();
	}, [isAuthenticated]);

	//------FETCH TRANSACTION DATA -------//
	//GET REQUEST
	useEffect(() => {
		const fetchTransaction = async () => {
			const response = await fetch('/api/transactions/user', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-type': 'application/json',
				},
			});
			const json = await response.json();
			// console.log(json.paymentTotal - json.purchaseTotal);
			// console.log(json.provTax + json.fedTax + json.postDeduction);

			if (response.ok) {
				dispatch({
					type: 'SET_TRANSACTIONS',
					transactions: json.transactions,
					paymentTotal: json.paymentTotal,
					purchaseTotal: json.purchaseTotal,
					provTax: json.provTax,
					fedTax: json.fedTax,
					postDeduction: json.postDeduction,
				});
			}
		};
		if (isAuthenticated) {
			fetchTransaction();
		}
	}, [isAuthenticated, userInfo]);

	console.log(userInfo.location);
	return (
		<StyledApp>
			<BrowserRouter>
				{isAuthenticated && <Navbar />}
				{isAuthenticated ? (
					!userInfo.location && legitCheck ? (
						<InitialSetup />
					) : (
						<div className='pages'>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/account' element={<Profile />} />
								<Route path='/preferences' element={<InitialSetup />} />
							</Routes>
						</div>
					)
				) : (
					<SignUp />
				)}
			</BrowserRouter>
		</StyledApp>
	);
}

export default App;

const StyledApp = styled.div`
	background-color: var(--off-white);

	.pages {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		min-height: 100vh;
	}
`;

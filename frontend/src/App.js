import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import FloatingShapes from './css/FloatingShapes';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';
import WavyAnim from './pages/WavyAnim';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useContext } from 'react';
import { UserContext } from './context/UserContext';
import { TransactionContext } from './context/TransactionContext';
import InitialSetup from './pages/InitialSetup';

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { dispatch } = useContext(TransactionContext);
	const { userStatus, userInfo, legitCheck, userDispatch } =
		useContext(UserContext);

	useEffect(() => {
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
			} else {
				userDispatch({ type: 'FAILED' });
			}
		};
		if (isAuthenticated) {
			fetchTransaction();
		}
	}, [isAuthenticated, userInfo]);

	return (
		<StyledApp>
			{isAuthenticated ? (
				<BrowserRouter>
					{isAuthenticated && userInfo.location && <Navbar />}
					{isAuthenticated ? (
						!userInfo.location && legitCheck ? (
							<InitialSetup />
						) : (
							<div className='pages'>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path='/account' element={<Profile />} />
									<Route path='/preferences' element={<WavyAnim />} />
								</Routes>
							</div>
						)
					) : (
						//DO SOMETHING HERE TO FIX LOADING BUG
						<SignUp />
					)}
				</BrowserRouter>
			) : userStatus !== 'idle' || !isAuthenticated ? (
				<SignUp />
			) : (
				<Loading />
			)}
		</StyledApp>
	);
}

export default App;

const StyledApp = styled.div`
	.pages {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		min-height: 100vh;
		/* height: 100%; */
		padding: 0px 32px;
		overflow: hidden;
	}
`;

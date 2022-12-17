import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
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
import fetchUserHandler from './utils/fetchUserHandler';
import fetchInitialTransactions from './utils/fetchInitialTransactions';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyles';
import { useStyleContext } from './hooks/useStyleHook';

function App() {
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { dispatch } = useContext(TransactionContext);
	const { userInfo, loadingObj, userDispatch } = useContext(UserContext);
	const { lightMode } = useStyleContext();
	//------FETCH TRANSACTION DATA -------//
	useEffect(() => {
		isAuthenticated && fetchUserHandler(user, userDispatch);
	}, [isAuthenticated, user, userDispatch]);
	//GET REQUEST
	useEffect(() => {
		isAuthenticated && fetchInitialTransactions(user, dispatch, userDispatch);
	}, [isAuthenticated, userInfo, dispatch, user, userDispatch]);

	return (
		<BrowserRouter>
			<GlobalStyle theme={lightMode} />
			<StyledApp>
				{loadingObj.user === 'verified' && userInfo.location && <Navbar />}
				{isAuthenticated && loadingObj.user === 'verified' ? (
					<div className='pages'>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/account' element={<Profile />} />
							<Route path='/preferences' element={<WavyAnim />} />
						</Routes>
					</div>
				) : !isLoading && loadingObj.user === 'loading' ? (
					loadingObj.user === 'verified' || isAuthenticated ? (
						<Loading />
					) : (
						<SignUp />
					)
				) : (
					<Loading />
				)}
			</StyledApp>
		</BrowserRouter>
	);
}

export default App;

const StyledApp = styled.div`
	.pages {
		max-width: 400px;
		/* width: 100%; */
		margin: auto;
	}
`;

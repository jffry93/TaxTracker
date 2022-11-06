import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { useContext, useEffect } from 'react';
import { StateContext } from './context/StateContext';

function App() {
	//ACCESS CONTEXT IN COMPONENT
	const { dispatch, state } = useContext(StateContext);

	console.log(state); //RETURNS STATE VALUE IN CONTEXT PROVIDER;
	let location = 'Montreal';
	//STOP INFINITE RE-RENDER
	useEffect(() => {
		dispatch({ type: 'MOVED', location, weather: 'Sunny' }); //CHANGE STATE IN COMPONENT
	}, []);

	return (
		<StyledApp>
			<BrowserRouter>
				<Navbar />
				<div className='pages'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/preferences' element={<Settings />} />
					</Routes>
				</div>
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

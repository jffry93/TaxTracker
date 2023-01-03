// import styled from 'styled-components';
import { useTransactionContext } from '../hooks/useTransactionHook';
import { useAuth0 } from '@auth0/auth0-react';
// components
import InitialSetup from '../pages/InitialSetup';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import InfoContainer from '../components/Transactions/Information/InfoContainer';

const Home = () => {
	const { transactions } = useTransactionContext();
	const { loadingObj } = useContext(UserContext);

	const { isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return (
		<>
			{loadingObj.transactions !== 'loading' && transactions ? (
				<InfoContainer />
			) : (
				loadingObj.transactions === 'checked' && <InitialSetup />
			)}
		</>
	);
};

export default Home;

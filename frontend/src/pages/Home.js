// import styled from 'styled-components';
import { useTransactionContext } from '../hooks/useTransactionHook';
import { useAuth0 } from '@auth0/auth0-react';
// components
import InitialSetup from '../pages/InitialSetup';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import InfoContainer from '../components/Transactions/Information/InfoContainer';

const Home = () => {
	const { transactions, postDeduction } = useTransactionContext();
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

// const StyledData = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	justify-content: center;

// 	min-height: 100vh;
// 	padding-bottom: 56px;
// 	width: 100%;
// 	max-width: 1200px;
// 	margin: 0 auto;
// `;

// const StyledMain = styled.div`
// 	width: 100%;
// 	padding: 16px 0px 16px;
// 	.chart {
// 		margin: auto;
// 		width: 270px;
// 		height: 270px;
// 		position: relative;
// 		.container {
// 			position: absolute;
// 			top: 50%;
// 			left: 50%;
// 			transform: translate(-50%, -50%);
// 			strong {
// 				margin-left: 16px;
// 				font-size: 20px;
// 			}
// 			h1 {
// 				font-size: 40px;
// 			}
// 		}
// 	}
// `;

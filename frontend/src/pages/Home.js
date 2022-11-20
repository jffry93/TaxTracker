import styled from 'styled-components';
import { useEffect } from 'react';
import { useTransactionContext } from '../hooks/useTransactionHook';
import { useStyleContext } from '../hooks/useStyleHook';
import { useAuth0 } from '@auth0/auth0-react';

//components
import TransactionForm from '../components/Transactions/TransactionsForm';
import TransactionCard from '../components/Transactions/TransactionCard';
import DoughnutChart from '../components/Chartjs/Doughnut';
import ChartInfo from '../components/Chartjs/ChartInfo';

const Home = () => {
	const { transactions, dispatch, postDeduction } = useTransactionContext();

	const { viewWidth, mobileBreakpoint } = useStyleContext();
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return (
		<>
			{isAuthenticated && transactions && (
				<StyledData>
					{/* <StyledTitle>TaxTracker</StyledTitle> */}
					<StyledMain>
						<div className='chart'>
							<div className='container'>
								<strong>INCOME</strong>
								<h1>${Math.floor(postDeduction)}</h1>
							</div>
							<DoughnutChart />
						</div>
					</StyledMain>
					<ChartInfo />
				</StyledData>
			)}
			{isAuthenticated && transactions && viewWidth > mobileBreakpoint && (
				<TransactionForm />
			)}
		</>
	);
};

export default Home;

const StyledTitle = styled.h1`
	padding: 8px 24px;
`;

const StyledData = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	min-height: 100vh;
	padding-bottom: 56px;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
`;

const StyledMain = styled.div`
	width: 100%;
	padding: 16px 0px 16px;

	/* position: sticky;
  top: 0; */
	/* background-color: var(--off-white); */
	.chart {
		margin: auto;
		width: 270px;
		height: 270px;
		/* width: clamp(270px, 88%, 300px);
		height: clamp(270px, 88%, 300px); */

		position: relative;
		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			strong {
				margin-left: 16px;
				font-size: 20px;
			}
			h1 {
				font-size: 40px;
			}
		}
	}
`;

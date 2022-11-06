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
	}, [isAuthenticated]);

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	return (
		<>
			{isAuthenticated && transactions && (
				<StyledData>
					<StyledTitle>TaxTracker</StyledTitle>
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

	/* gap: 32px; */
	min-height: 100vh;
	padding-bottom: 56px;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	/* padding: 16px 0px; */
	/* div:first-child {
    flex: 3;
  }
  div:last-child {
    flex: 2;
  }
  .transactions {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  form,
  .transactions {
    flex: 1;
  } */
	/* @media (max-width: 650px) {
    flex-direction: column-reverse;
  } */
`;

const StyledMain = styled.div`
	width: 100%;
	padding: 16px 0px 16px;

	/* position: sticky;
  top: 0; */
	background-color: var(--off-white);
	.chart {
		margin: auto;
		min-width: 270px;
		min-height: 270px;
		max-width: 300px;
		max-height: 300px;
		width: 88%;
		position: relative;
		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

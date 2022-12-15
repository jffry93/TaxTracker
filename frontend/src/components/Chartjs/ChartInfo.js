import styled from 'styled-components';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import Divider from '@mui/material/Divider';

const ChartInfo = () => {
	const { paymentTotal, fedTax, provTax, purchaseTotal, postDeduction } =
		useTransactionContext();
	return (
		<StyledContainer>
			<div className='container'>
				<strong>Gross:</strong>
				<h3>${Math.floor(paymentTotal)}</h3>
			</div>
			<div className='container'>
				<strong>Fed Tax:</strong>
				<h3>${Math.floor(fedTax)}</h3>
			</div>
			<div className='container'>
				<strong>Prov Tax:</strong>
				<h3>${Math.floor(provTax)}</h3>
			</div>
			<Divider />
			<div className='container'>
				<strong>Expense:</strong>
				<h3>${Math.floor(purchaseTotal)}</h3>
			</div>
			<Divider />
			<div className='container'>
				<strong>Net:</strong>
				<h3>${Math.floor(postDeduction)}</h3>
			</div>
		</StyledContainer>
	);
};

export default ChartInfo;

const StyledContainer = styled.div`
	width: 100%;
	padding: 16px 32px 0;

	.container {
		padding: 0;
		margin: 16px 8px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

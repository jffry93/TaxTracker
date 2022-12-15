import { Box } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import FilterSort from './FilterSort';
import TransactionCard from '../../../Transactions/Card/CardContainer';
import { useTransactionContext } from '../../../../hooks/useTransactionHook';

const DrawerList = ({ anchor, debounceCloseDrawer }) => {
	const { transactions } = useTransactionContext();
	return (
		<StyledBox
			sx={{
				width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100%',
			}}
			role='presentation'
			onClick={debounceCloseDrawer}
		>
			<FilterSort />
			<StyledCards>
				{transactions &&
					transactions.map((transaction, index) => {
						return (
							<TransactionCard
								key={transaction._id}
								transaction={transaction}
							/>
						);
					})}
			</StyledCards>
		</StyledBox>
	);
};

export default DrawerList;

const StyledBox = styled(Box)`
	background-color: none;
`;

const StyledCards = styled.div`
	min-height: calc(100vh - 80px);
	padding: 24px 24px 68px;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	gap: 24px;
	/* background-color: none; */
	/* background-color: rgba(255, 255, 255, 0.8); */
`;

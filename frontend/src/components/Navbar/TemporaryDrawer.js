import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';
import TransactionCard from '../Transactions/TransactionCard';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import styled from 'styled-components';
import useDebounce from '../../hooks/useDebounce';
import '../../css/MaterialSelect.css';
import FilterSort from './FilterSort';

// import { useAuth0 } from '@auth0/auth0-react';

const TemporaryDrawer = () => {
	const { transactions } = useTransactionContext();
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const debounceOpenDrawer = useDebounce(() =>
		setState({ ...state, left: true })
	);
	const debounceCloseDrawer = useDebounce(() =>
		setState({ ...state, left: false })
	);

	//THE CONTAINER THAT SLIDES IN
	const list = (anchor) => (
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

	return (
		<>
			<IconButton
				// disabled={!isAuthenticated}
				onClick={debounceOpenDrawer}
				color='inherit'
				aria-label='open drawer'
			>
				<MenuIcon />
			</IconButton>
			<StyledDrawer
				PaperProps={{
					sx: { width: '100vw', backgroundColor: 'transparent' },
				}}
				anchor={'left'}
				open={state['left']}
				onClose={debounceCloseDrawer}
			>
				{list('left')}
			</StyledDrawer>
		</>
	);
};

export default TemporaryDrawer;

const StyledDrawer = styled(Drawer)`
	background-color: transparent;
`;

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

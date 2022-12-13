import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useState } from 'react';
import TransactionCard from '../Transactions/TransactionCard';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import styled from 'styled-components';
// import { useAuth0 } from '@auth0/auth0-react';

const TemporaryDrawer = () => {
	// const { user, isAuthenticated, isLoading } = useAuth0();
	const { transactions, filterType, sortType, dispatch } =
		useTransactionContext();
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const handleFilter = (e) => {
		dispatch({ type: 'FILTER_TRANSACTIONS', payload: e.target.value });
		dispatch({ type: 'SORT_TRANSACTIONS', payload: sortType });
	};

	const handleSort = (e) => {
		dispatch({ type: 'SORT_TRANSACTIONS', payload: e.target.value });
	};

	//THE CONTAINER THAT SLIDES IN
	const list = (anchor) => (
		<Box
			sx={{
				width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100%',
			}}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<StyledContainer
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<FormControl fullWidth>
					<InputLabel htmlFor='card-types'>Filter</InputLabel>
					<Select
						id='filter-input'
						name='card-types'
						value={filterType}
						onClick={(e) => e.stopPropagation()}
						onChange={handleFilter}
					>
						<MenuItem value='all'>All</MenuItem>
						<MenuItem value='purchase'>Purchases</MenuItem>
						<MenuItem value='payment'>Payments</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel htmlFor='sort'>Sort</InputLabel>
					<Select
						id='sort'
						name='sort'
						value={sortType}
						onClick={(e) => e.stopPropagation()}
						onChange={handleSort}
					>
						<MenuItem value='recent'>Recent</MenuItem>
						<MenuItem value='oldest'>Oldest</MenuItem>
						<MenuItem value='high-to-low'>High - Low</MenuItem>
						<MenuItem value='low-to-high'>Low - High</MenuItem>
					</Select>
				</FormControl>
			</StyledContainer>
			<Divider />
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
		</Box>
	);

	return (
		<>
			<IconButton
				// disabled={!isAuthenticated}
				onClick={toggleDrawer('left', true)}
				color='inherit'
				aria-label='open drawer'
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				PaperProps={{
					sx: { width: '100vw' },
				}}
				anchor={'left'}
				open={state['left']}
				onClose={toggleDrawer('left', false)}
			>
				{list('left')}
			</Drawer>
		</>
	);
};

export default TemporaryDrawer;

const StyledCards = styled.div`
	min-height: calc(100vh - 80px);
	padding: 24px 24px 68px;
	display: flex;
	flex-direction: column;
	align-items: center;
	/* justify-content: center; */
	gap: 24px;
`;
const StyledContainer = styled.div`
	display: flex;
	gap: 16px;
	padding: 24px 16px 8px;
	label {
		position: absolute;
		top: -15%;
		padding-bottom: 16px;
	}
`;

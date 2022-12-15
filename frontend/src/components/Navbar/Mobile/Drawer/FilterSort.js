import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTransactionContext } from '../../../../hooks/useTransactionHook';

const FilterSort = () => {
	const { filterType, sortType, dispatch } = useTransactionContext();

	const handleFilter = (e) => {
		dispatch({ type: 'FILTER_TRANSACTIONS', payload: e.target.value });
		dispatch({ type: 'SORT_TRANSACTIONS', payload: sortType });
	};

	const handleSort = (e) => {
		dispatch({ type: 'SORT_TRANSACTIONS', payload: e.target.value });
	};

	return (
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
	);
};

export default FilterSort;

const StyledContainer = styled.div`
	position: sticky;
	top: 0;
	z-index: 1;
	display: flex;
	gap: 16px;
	padding: 24px 16px 8px;
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
	background-color: rgba(255, 255, 255, 0.8);
	label {
		position: absolute;
		top: -15%;
		padding-bottom: 16px;
	}
`;

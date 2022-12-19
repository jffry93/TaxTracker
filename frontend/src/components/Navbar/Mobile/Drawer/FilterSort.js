import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTransactionContext } from '../../../../hooks/useTransactionHook';
import { useState } from 'react';

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
			<StyledFormControl className='filter'>
				<InputLabel htmlFor='card-types'>Filter</InputLabel>
				<Select
					id='filter-input'
					name='card-types'
					value={filterType}
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={handleFilter}
				>
					<MenuItem value='all'>All</MenuItem>
					<MenuItem value='purchase'>Purchases</MenuItem>
					<MenuItem value='payment'>Payments</MenuItem>
				</Select>
			</StyledFormControl>
			<StyledFormControl className='sort'>
				<InputLabel htmlFor='sort'>Sort</InputLabel>
				<Select
					id='sort'
					name='sort'
					value={sortType}
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={handleSort}
				>
					<MenuItem value='recent'>Recent</MenuItem>
					<MenuItem value='oldest'>Oldest</MenuItem>
					<MenuItem value='high-to-low'>High - Low</MenuItem>
					<MenuItem value='low-to-high'>Low - High</MenuItem>
				</Select>
			</StyledFormControl>
		</StyledContainer>
	);
};

export default FilterSort;

const StyledFormControl = styled(FormControl)`
	flex: 1;

	fieldset {
		border: none;
	}
	label {
		color: var(--wave-text);
		position: absolute;
		top: -15%;
		padding-bottom: 16px;
	}

	.css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
		color: var(--wave-text);
	}

	.MuiInputBase-root {
		color: var(--wave-text);
		outline: 1px solid var(--wave-text);
	}

	&:hover {
		svg {
			color: var(--wave-color-5);
		}
		label {
			color: var(--wave-color-5);
		}
		.MuiInputBase-root {
			&:hover {
				color: var(--wave-color-5);
				outline: 1px solid var(--wave-color-5);
				svg {
					color: var(--wave-color-5);
				}
				label {
					color: var(--wave-color-5);
				}
			}
		}
		.MuiFormControl-root {
			&:hover {
				.MuiInputBase-root {
					color: var(--wave-color-5);
				}
			}
		}
	}
`;

const StyledContainer = styled.div`
	position: sticky;
	top: 0;
	z-index: 1;
	display: flex;
	justify-content: center;
	gap: 24px;
	padding: 32px 24px 16px;
	border-bottom: 0.5px solid rgba(0, 0, 0, 0.2);
	background-color: var(--wave-color-1);
	/* color: var(--wave-text); */
	.sort,
	.filter {
	}
`;

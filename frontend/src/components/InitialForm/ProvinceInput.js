import React from 'react';
import provArr from '../Data/Province';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledInput } from '../../styles/StyledInitial';
import styled from 'styled-components';

const ProvinceInput = ({
	setEmptyFields,
	emptyFields,
	formLocation,
	setFormLocation,
	formData,
	setFormData,
}) => {
	return (
		<FormControl fullWidth>
			<StyledInput
				htmlFor='sort'
				error={emptyFields.includes('location') ? true : false}
			>
				{!emptyFields.includes('location') ? (
					<>
						Province<span>*required</span>
					</>
				) : (
					'Oops, try again'
				)}
			</StyledInput>
			<StyledSelect
				error={emptyFields.includes('location') ? true : false}
				placeholder='where u at?'
				label={emptyFields.includes('location') ? 'Province' : 'where u at?'}
				name='location'
				value={formLocation}
				onChange={(e) => {
					setFormLocation(e.target.value);
					setFormData({ ...formData, [e.target.name]: e.target.value });
					console.log(provArr.includes(e.target.value));
					provArr.includes(e.target.value) && setEmptyFields([]);
				}}
			>
				{provArr.map((province) => (
					<MenuItem key={province} value={province}>
						{province.toUpperCase()}
					</MenuItem>
				))}
			</StyledSelect>
		</FormControl>
	);
};

const StyledSelect = styled(Select)`
	legend {
		width: 96px;
	}
	svg {
		color: ${(props) => (!props.error ? 'var(--wave-text)' : 'var(--error)')};
	}
`;

export default ProvinceInput;

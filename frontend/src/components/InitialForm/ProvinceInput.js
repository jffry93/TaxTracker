import React from 'react';
import provArr from '../Data/Province';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledInput } from '../../styles/StyledInitial';

const ProvinceInput = ({
	emptyFields,
	formLocation,
	setFormLocation,
	formData,
	setFormData,
}) => {
	return (
		<FormControl fullWidth>
			<StyledInput htmlFor='sort'>
				{!emptyFields.includes('location') ? (
					<>
						Province<span>*required</span>
					</>
				) : (
					'Oops, try again'
				)}
			</StyledInput>
			<Select
				error={emptyFields.includes('location') ? true : false}
				placeholder='where u at?'
				label={emptyFields.includes('location') ? 'Province' : 'where u at?'}
				name='location'
				value={formLocation}
				onChange={(e) => {
					setFormLocation(e.target.value);
					setFormData({ ...formData, [e.target.name]: e.target.value });
				}}
			>
				{provArr.map((province) => (
					<MenuItem key={province} value={province}>
						{province.toUpperCase()}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default ProvinceInput;

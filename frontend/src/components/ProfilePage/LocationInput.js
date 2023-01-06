import uuid from 'react-uuid';
import React from 'react';
import provArr from '../../components/Data/Province';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { StyledSpan } from '../../styles/StyledProfile';

const LocationInput = ({
	updateActive,
	location,
	formLocation,
	setFormLocation,
	formData,
	setFormData,
}) => {
	return (
		<>
			<StyledSpan updateActive={updateActive}>Location</StyledSpan>
			{!updateActive ? (
				location ? (
					<h2>{location}</h2>
				) : (
					<h2>add location</h2>
				)
			) : (
				<FormControl fullWidth>
					<InputLabel htmlFor='sort'>Province</InputLabel>
					<Select
						placeholder='where u at?'
						variant='outlined'
						name='location'
						value={formLocation}
						onChange={(e) => {
							setFormLocation(e.target.value);
							setFormData({
								...formData,
								[e.target.name]: e.target.value,
							});
						}}
					>
						{provArr.map((province) => (
							<MenuItem key={uuid()} value={province}>
								{province.toUpperCase()}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</>
	);
};

export default LocationInput;

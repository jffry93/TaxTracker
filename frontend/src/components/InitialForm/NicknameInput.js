import React from 'react';
import TextField from '@mui/material/TextField';
const NicknameInput = ({ formName, setFormName, formData, setFormData }) => {
	return (
		<>
			<TextField
				id='outlined-basic'
				label='Nickname'
				variant='outlined'
				type='text'
				placeholder='Who is you?'
				name='nickname'
				value={formName}
				onChange={(e) => {
					setFormName((prev) => {
						return e.target.value;
					});
					setFormData({ ...formData, [e.target.name]: e.target.value });
				}}
			/>
		</>
	);
};

export default NicknameInput;

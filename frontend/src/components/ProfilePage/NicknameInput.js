import { TextField } from '@mui/material';
import React from 'react';
import { StyledSpan } from '../../styles/StyledProfile';

const NicknameInput = ({
	updateActive,
	nickname,
	formName,
	setFormName,
	formData,
	setFormData,
}) => {
	return (
		<>
			<StyledSpan updateActive={updateActive}>Nickname</StyledSpan>
			{!updateActive ? (
				<h2>{nickname ? nickname : 'Add Nickname'}</h2>
			) : (
				<TextField
					label='Nickname'
					variant='outlined'
					type='text'
					name='nickname'
					value={formName}
					onChange={(e) => {
						setFormName((prev) => {
							return e.target.value;
						});
						setFormData({ ...formData, [e.target.name]: e.target.value });
					}}
				/>
			)}
		</>
	);
};

export default NicknameInput;

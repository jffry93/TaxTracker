import provArr from '../components/Data/Province';
// import Zoom from 'react-medium-image-zoom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { TransactionContext } from '../context/TransactionContext';
import { useNavigate } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Province from '../components/Data/Province';
import TextField from '@mui/material/TextField';

const InitialSetup = () => {
	const { dispatch } = useContext(TransactionContext);
	//USER CONTEXT
	const { userInfo, userDispatch } = useContext(UserContext);
	const { picture, nickname, email, location, age } = userInfo;
	//FORM STATE
	const [formData, setFormData] = useState({});
	const [formName, setFormName] = useState('');
	const [formLocation, setFormLocation] = useState('');
	const navigate = useNavigate();

	//UPDATE USER DATA
	const patchHandler = async (e) => {
		e.preventDefault();

		if (formLocation.length) {
			const res = await fetch('/api/user/', {
				method: 'PATCH',
				body: JSON.stringify({ ...formData, email }),
				headers: {
					'Content-type': 'application/json',
				},
			});
			const data = await res.json();

			setFormLocation('');
			userDispatch({ type: 'UPDATE_USER', user: { ...data } });
			navigate('/');
		}
	};

	return (
		<StyledInit>
			<h1>Where are you located?</h1>
			<h2>It's for tax purposes...</h2>
			<StyledForm onSubmit={patchHandler}>
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

				<FormControl fullWidth>
					<InputLabel htmlFor='sort'>Province</InputLabel>
					<Select
						placeholder='where u at?'
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

				<button type='submit'>Save</button>
			</StyledForm>
		</StyledInit>
	);
};

export default InitialSetup;

const StyledInit = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: center;
	gap: 16px;

	height: 100%;
	min-height: 100vh;
	/* border: 1px solid green; */
	padding: 64px 32px;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 16px;
	button,
	div {
		width: 100%;
	}
`;

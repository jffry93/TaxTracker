import provArr from '../components/Data/Province';
// import Zoom from 'react-medium-image-zoom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

const InitialSetup = () => {
	//USER CONTEXT
	const { userInfo, userDispatch } = useContext(UserContext);
	const { email } = userInfo;
	//FORM STATE
	const [emptyFields, setEmptyFields] = useState([]);
	const [formData, setFormData] = useState({});
	const [formName, setFormName] = useState('');
	const [formLocation, setFormLocation] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		console.log('mount');
		return () => {
			setEmptyFields([]);
			setFormLocation('');
		};
	}, []);

	//UPDATE USER DATA
	const patchHandler = async () => {
		// e.preventDefault();
		console.log(formLocation);

		if (formLocation.length) {
			const res = await fetch('/api/user/', {
				method: 'PATCH',
				body: JSON.stringify({ ...formData, email }),
				headers: {
					'Content-type': 'application/json',
				},
			});
			const data = await res.json();

			userDispatch({ type: 'UPDATE_USER', user: { ...data } });
			navigate('/');
			// setEmptyFields([]);
		} else {
			setEmptyFields(['location']);
		}
	};

	const debouncePatch = useDebounce(patchHandler);

	return (
		<StyledInit>
			<h1>Where are you located?</h1>
			<h2>It's for tax purposes...</h2>
			<StyledForm
				onSubmit={(e) => {
					e.preventDefault();
					debouncePatch();
				}}
			>
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
						label={
							emptyFields.includes('location') ? 'Province' : 'where u at?'
						}
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
	/* background-color: black; */
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

const StyledInput = styled(InputLabel)`
	width: 150px;
	span {
		position: relative;
		top: -5px;
		left: 5px;
		font-size: 12px;
	}
`;

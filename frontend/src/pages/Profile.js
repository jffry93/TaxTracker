import provArr from '../components/Data/Province';
// import Zoom from 'react-medium-image-zoom';
import Zoom from 'react-medium-image-zoom';

import styled from 'styled-components';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { TransactionContext } from '../context/TransactionContext';
import patchTransactions from '../utils/patchTransactions';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useDebounce from '../hooks/useDebounce';

const Profile = () => {
	const { dispatch } = useContext(TransactionContext);
	//USER CONTEXT
	const { userInfo, userDispatch } = useContext(UserContext);
	const { picture, nickname, email, location } = userInfo;
	//TOGGLING STATE
	const [updateActive, setUpdateActive] = useState(false);
	const [submitState, setSubmitState] = useState(false);
	//FORM STATE
	const [formData, setFormData] = useState({});
	//INDIVIDUAL INPUTS
	const [formName, setFormName] = useState('');
	const [formLocation, setFormLocation] = useState('');

	const handleFormSubmit = () => {
		//FETCH IF LOCATION CHANGED
		formName.length &&
			formLocation.length &&
			patchTransactions(userInfo, dispatch);

		//UPDATE USER DATA
		const patchHandler = async () => {
			const res = await fetch('/api/user/', {
				method: 'PATCH',
				body: JSON.stringify({ ...formData, email }),
				headers: {
					'Content-type': 'application/json',
				},
			});
			const data = await res.json();
			setUpdateActive(false);
			setSubmitState(false);
			setFormName('');
			setFormLocation('');
			userDispatch({ type: 'UPDATE_USER', user: { ...data } });
		};
		submitState && patchHandler();
	};
	const debounceForm = useDebounce(handleFormSubmit);
	const debounceOpen = useDebounce(() => setUpdateActive(true));
	const debounceClose = useDebounce(() => {
		setUpdateActive(false);
	});

	return (
		<StyledZoom>
			<StyledInfo>
				<StyledForm
					onSubmit={(e) => {
						e.preventDefault();
						debounceForm(handleFormSubmit);
					}}
				>
					<h2>Profile</h2>
					<div className='zoom-div'>
						<Zoom classDialog={'custom-zoom'}>
							<img alt='This is the user' src={picture} width='500' />
						</Zoom>
					</div>
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
									<MenuItem key={province} value={province}>
										{province.toUpperCase()}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}

					<div className='button-container'>
						{!updateActive ? (
							<button
								onClick={(e) => {
									e.preventDefault();
									debounceOpen();
								}}
							>
								Update
							</button>
						) : (
							<>
								<button
									type='submit'
									onClick={() => {
										setSubmitState(true);
									}}
								>
									Save
								</button>
								<button
									onClick={(e) => {
										e.preventDefault();
										debounceClose();
									}}
								>
									Cancel
								</button>
							</>
						)}
					</div>
				</StyledForm>
			</StyledInfo>
		</StyledZoom>
	);
};

export default Profile;

const StyledZoom = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	min-height: 100vh;
	width: 100%;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;

	min-height: 550px;
	padding: 32px 32px 56px;

	width: 100%;
	.zoom-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 220px;
		img {
			width: 200px;
			border-radius: 50%;
			max-width: 200px;
		}
	}
	.button-container {
		display: flex;
		flex-direction: column;
		gap: 4px;

		width: 100%;
		margin-top: 16px;
	}
`;
const StyledSpan = styled.span`
	opacity: ${(props) => {
		return props.updateActive === true ? '0' : '1';
	}};
`;

const StyledInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	min-height: 631px;
	h2 {
		min-height: 56px;
		font-size: 26px;
		display: flex;
		align-items: flex-end;
		padding-bottom: 8px;
	}
`;

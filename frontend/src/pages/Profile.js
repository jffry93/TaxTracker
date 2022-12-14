import provArr from '../components/Data/Province';
// import Zoom from 'react-medium-image-zoom';
import Zoom from 'react-medium-image-zoom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { TransactionContext } from '../context/TransactionContext';

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
	const { picture, nickname, email, location, age } = userInfo;
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

		const fetchTransaction = async () => {
			const response = await fetch('/api/transactions/user', {
				method: 'POST',
				body: JSON.stringify(userInfo),
				headers: {
					'Content-type': 'application/json',
				},
			});
			const json = await response.json();
			// console.log(json.paymentTotal - json.purchaseTotal);
			// console.log(json.provTax + json.fedTax + json.postDeduction);

			if (response.ok) {
				dispatch({
					type: 'SET_TRANSACTIONS',
					transactions: json.transactions,
					paymentTotal: json.paymentTotal,
					purchaseTotal: json.purchaseTotal,
					provTax: json.provTax,
					fedTax: json.fedTax,
					postDeduction: json.postDeduction,
				});
			}
		};

		fetchTransaction();

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
							<img alt='image of user' src={picture} />
						</Zoom>
					</div>
					<StyledSpan updateActive={updateActive}>Nickname</StyledSpan>
					{!updateActive ? (
						nickname ? (
							<h2>{nickname}</h2>
						) : (
							<h2>Add Nickname</h2>
						)
					) : (
						<TextField
							label='Nickname'
							variant='outlined'
							type='text'
							placeholder='where u at?'
							name='nickname'
							value={formName}
							onChange={(e) => {
								setFormName((prev) => {
									// console.log(prev);
									// console.log(e.target.value);
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
	/* border: 4px solid green; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	/* align-items: center; */
	/* display: none; */
	min-height: 100vh;
	width: 100%;
	/* padding-bottom: 56px; */
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	min-height: 550px;
	padding: 32px 16px 56px;
	/* border: 1px solid red; */
	width: 100%;
	.zoom-div {
		/* border: 1px solid red; */
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
	border: 1px solid blue;
	min-height: 631px;
	h2 {
		min-height: 56px;
		font-size: 26px;
		display: flex;
		align-items: flex-end;
		padding-bottom: 8px;
		/* font-size: clamp(16px, 15vw, 18px); */
	}
`;

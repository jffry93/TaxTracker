// import Zoom from 'react-medium-image-zoom';
import Zoom from 'react-medium-image-zoom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { TransactionContext } from '../context/TransactionContext';

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
	const [formAge, setFormAge] = useState('');
	const [formLocation, setFormLocation] = useState('');

	const handleFormSubmit = (e) => {
		e.preventDefault();
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
			setFormAge('');
			setFormLocation('');
			userDispatch({ type: 'UPDATE_USER', user: { ...data } });
		};
		submitState && patchHandler();
	};

	return (
		<StyledZoom>
			<h2>Profile</h2>
			<Zoom classDialog={'custom-zoom'}>
				<img alt='image of user' src={picture} />
			</Zoom>
			<StyledInfo>
				<StyledForm onSubmit={handleFormSubmit}>
					<span>Name</span>
					{!updateActive ? (
						nickname ? (
							<h2>{nickname}</h2>
						) : (
							<h2>add nickname</h2>
						)
					) : (
						<input
							type='text'
							placeholder='where u at?'
							name='nickname'
							value={formName}
							onChange={(e) => {
								setFormName((prev) => {
									console.log(prev);
									console.log(e.target.value);
									return e.target.value;
								});
								setFormData({ ...formData, [e.target.name]: e.target.value });
							}}
						/>
					)}
					<span>Location</span>
					{!updateActive ? (
						location ? (
							<h2>{location}</h2>
						) : (
							<h2>add location</h2>
						)
					) : (
						<select
							placeholder='where u at?'
							name='location'
							value={formLocation}
							onChange={(e) => {
								setFormLocation(e.target.value);
								setFormData({ ...formData, [e.target.name]: e.target.value });
							}}
						>
							<option value=''>default</option>
							<option value='Newfoundland'>P.E.I</option>
							<option value='Prince Edward'>P.E.I</option>
							<option value='Nova Scotia'>Nova Scotia</option>
							<option value='New Brunswick'>New Brunswick</option>
							<option value='Quebec'>Quebec</option>
							<option value='Ontario'>Ontario</option>
							<option value='Manitoba'>Manitoba</option>
							<option value='Saskatchewan'>Saskatchewan</option>
							<option value='Alberta'>Alberta</option>
							<option value='British Columbia'>B.C</option>
							<option value='Yukon'>Yukon</option>
							<option value='North West'>North West Territories</option>
							<option value='Nunavut'>Nunavut</option>
						</select>
					)}

					<div className='button-container'>
						{!updateActive ? (
							<button
								onClick={() => {
									setUpdateActive(true);
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
								<button onClick={() => setUpdateActive(false)}>Cancel</button>
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
	border: 1px solid green;
	/* display: none; */
	img {
		width: 300px;
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

// import Zoom from 'react-medium-image-zoom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { TransactionContext } from '../context/TransactionContext';
import { useNavigate } from 'react-router-dom';

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
	console.log(formLocation);
	//UPDATE USER DATA
	const patchHandler = async (e) => {
		e.preventDefault();
		console.log('patch');
		if (formLocation.length) {
			const res = await fetch('/api/user/', {
				method: 'PATCH',
				body: JSON.stringify({ ...formData, email }),
				headers: {
					'Content-type': 'application/json',
				},
			});
			const data = await res.json();
			console.log(data);
			setFormLocation('');
			userDispatch({ type: 'UPDATE_USER', user: { ...data } });
			navigate('/');
		}
	};

	return (
		<StyledInit>
			<h2>Where are you located?</h2>
			<p>It's for tax purposes...</p>
			<StyledForm onSubmit={patchHandler}>
				<label>Nickname</label>
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
				<label>Province</label>
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
				<button type='submit'>Save</button>
			</StyledForm>
		</StyledInit>
	);
};

export default InitialSetup;

const StyledInit = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	justify-content: center;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

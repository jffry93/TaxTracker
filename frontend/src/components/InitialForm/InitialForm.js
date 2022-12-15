import React, { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';
import { StyledForm } from '../../styles/StyledInitial';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import useDebounce from '../../hooks/useDebounce';
import ProvinceInput from './ProvinceInput';
import NicknameInput from '../InitialForm/NicknameInput';
import initialLocation from '../../utils/initialLocation';

const InitialForm = ({
	formLocation,
	emptyFields,
	setEmptyFields,
	setFormLocation,
}) => {
	const { userInfo, userDispatch } = useContext(UserContext);
	const { email } = userInfo;
	const [formName, setFormName] = useState('');
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();

	//UPDATE USER DATA
	const patchHandler = () => {
		initialLocation(
			formLocation,
			formData,
			email,
			userDispatch,
			setEmptyFields,
			navigate
		);
	};

	const debouncePatch = useDebounce(patchHandler);

	return (
		<StyledForm
			onSubmit={(e) => {
				e.preventDefault();
				debouncePatch();
			}}
		>
			<NicknameInput
				formName={formName}
				setFormName={setFormName}
				formData={formData}
				setFormData={setFormData}
			/>
			<ProvinceInput
				emptyFields={emptyFields}
				formLocation={formLocation}
				setFormLocation={setFormLocation}
				formData={formData}
				setFormData={setFormData}
			/>

			<button type='submit'>Save</button>
		</StyledForm>
	);
};

export default InitialForm;

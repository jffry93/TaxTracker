import React, { useContext, useState } from 'react';
import { TransactionContext } from '../../context/TransactionContext';
import { UserContext } from '../../context/UserContext';
import useDebounce from '../../hooks/useDebounce';
import { StyledForm } from '../../styles/StyledProfile';
import updateTransaction from '../../utils/updateTransaction';
import updateLocation from '../../utils/updateLocation';
import ProfileFormButtons from './ProfileFormButtons';
import NicknameInput from './NicknameInput';
import LocationInput from './LocationInput';

const ProfileForm = () => {
	const { dispatch } = useContext(TransactionContext);
	const { userInfo, userDispatch } = useContext(UserContext);
	const { nickname, email, location } = userInfo;
	//TOGGLING STATE
	const [updateActive, setUpdateActive] = useState(false);
	const [submitState, setSubmitState] = useState(false);
	const [formData, setFormData] = useState({});
	const [formName, setFormName] = useState('');
	const [formLocation, setFormLocation] = useState('');

	const handleFormSubmit = () => {
		const resetForm = () => {
			setUpdateActive(false);
			setSubmitState(false);
			setFormName('');
			setFormLocation('');
		};
		//FETCH IF LOCATION CHANGED
		formName.length &&
			formLocation.length &&
			updateTransaction(userInfo, dispatch);

		submitState && updateLocation(formData, email, userDispatch, resetForm);
	};

	const debounceForm = useDebounce(handleFormSubmit);

	return (
		<StyledForm
			onSubmit={(e) => {
				e.preventDefault();
				debounceForm(handleFormSubmit);
			}}
		>
			<NicknameInput
				updateActive={updateActive}
				nickname={nickname}
				formName={formName}
				setFormName={setFormName}
				formData={formData}
				setFormData={setFormData}
			/>
			<LocationInput
				updateActive={updateActive}
				location={location}
				formLocation={formLocation}
				setFormLocation={setFormLocation}
				formData={formData}
				setFormData={setFormData}
			/>
			<ProfileFormButtons
				updateActive={updateActive}
				setUpdateActive={setUpdateActive}
				setSubmitState={setSubmitState}
			/>
		</StyledForm>
	);
};

export default ProfileForm;

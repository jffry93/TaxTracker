import React from 'react';
import useDebounce from '../../hooks/useDebounce';
import { StyledButtonContainer } from '../../styles/StyledProfile';

const ProfileFormButtons = ({
	resetForm,
	updateActive,
	setUpdateActive,
	setSubmitState,
}) => {
	const debounceOpen = useDebounce(() => setUpdateActive(true));
	const debounceClose = useDebounce(() => {
		setUpdateActive(false);
		resetForm();
	});
	return (
		<StyledButtonContainer>
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
		</StyledButtonContainer>
	);
};

export default ProfileFormButtons;

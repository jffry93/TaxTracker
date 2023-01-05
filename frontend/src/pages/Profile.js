import 'react-medium-image-zoom/dist/styles.css';
import '../styles/ImageZoom.css';
import Zoom from 'react-medium-image-zoom';

import styled from 'styled-components';
import { useContext, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';
import ProfileForm from '../components/ProfilePage/ProfileForm';
import { BsCameraFill } from 'react-icons/bs';

const Profile = () => {
	const [updateActive, setUpdateActive] = useState(false);
	const [imageValue, setImageValue] = useState(null);
	const inputImage = useRef(null);
	const { userInfo } = useContext(UserContext);
	const { picture } = userInfo;

	const handleSelectImage = () => {
		inputImage.current.click();
	};

	return (
		<StyledInfo>
			<StyledMain>
				<StyledTitle>
					<h2>Profile</h2>
					{updateActive && (
						<>
							<div className='icon-container' onClick={handleSelectImage}>
								<BsCameraFill size={20} color='white' />
							</div>
							<input
								ref={inputImage}
								label={'Add an Image'}
								type='file'
								accept='image/*'
								onChange={(e) => {
									const reader = new FileReader();
									if (e.target.files[0]) {
										reader.readAsDataURL(e.target.files[0]);
										reader.onloadend = (e) => {
											setImageValue(reader.result);
										};
									}
								}}
							/>
						</>
					)}
				</StyledTitle>
				<div className='zoom-div'>
					<Zoom classDialog={'custom-zoom'}>
						<img
							alt='This is the user'
							src={!imageValue ? picture : imageValue}
							width='500'
						/>
					</Zoom>
				</div>
				<ProfileForm
					imageValue={imageValue}
					setImageValue={setImageValue}
					updateActive={updateActive}
					setUpdateActive={setUpdateActive}
				/>
			</StyledMain>
		</StyledInfo>
	);
};

export default Profile;
const StyledTitle = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	input {
		display: none;
	}

	.icon-container {
		background-color: var(--primary);
		border-radius: 50%;
		height: 35px;
		width: 35px;
		/* border-radius: 50%; */

		cursor: pointer;

		position: relative;
		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 647px;
	padding: 32px 32px 56px;

	width: 100%;
	.zoom-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 220px;
		img {
			height: 200px;
			width: 200px;
			border-radius: 50%;
			max-width: 200px;
		}
	}
`;

const StyledInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	h2 {
		min-height: 48px;
		font-size: 32px;
		display: flex;
		align-items: flex-end;
		padding: 13px 0 12px;
	}
`;

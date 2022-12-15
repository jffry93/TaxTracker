import 'react-medium-image-zoom/dist/styles.css';
import '../styles/ImageZoom.css';
import Zoom from 'react-medium-image-zoom';

import styled from 'styled-components';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import ProfileForm from '../components/ProfilePage/ProfileForm';

const Profile = () => {
	const { userInfo } = useContext(UserContext);
	const { picture } = userInfo;

	return (
		<StyledInfo>
			<StyledMain>
				<h2>Profile</h2>
				<div className='zoom-div'>
					<Zoom classDialog={'custom-zoom'}>
						<img alt='This is the user' src={picture} width='500' />
					</Zoom>
				</div>
				<ProfileForm />
			</StyledMain>
		</StyledInfo>
	);
};

export default Profile;

const StyledMain = styled.div`
	display: flex;
	flex-direction: column;

	min-height: 631px;
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
`;

const StyledInfo = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	h2 {
		min-height: 56px;
		font-size: 26px;
		display: flex;
		align-items: flex-end;
		padding-bottom: 8px;
	}
`;

import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useDebounce from '../../../../hooks/useDebounce';
import { useStyleContext } from '../../../../hooks/useStyleHook';
import MenuItem from '@mui/material/MenuItem';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { BiHome, BiUser, BiAdjust } from 'react-icons/bi';

const SettingButtons = () => {
	const { logout } = useAuth0();
	const { lightMode, setLightMode } = useStyleContext();
	const navigate = useNavigate();
	const debounceHome = useDebounce(() => {
		navigate('/');
	});
	const debounceProfile = useDebounce(() => {
		navigate('/account');
	});
	const debounceLightMode = useDebounce(() => {
		setLightMode(!lightMode);
	});
	const handleLogout = useDebounce(() =>
		logout({ returnTo: window.location.origin })
	);
	const buttonsArray = [
		{
			name: 'Home',
			func: debounceHome,
			icon: () => <BiHome size={20} />,
		},
		{
			name: 'Profile',
			func: debounceProfile,
			icon: () => <BiUser size={20} />,
		},
		{
			name: lightMode ? 'Dark' : 'Light',
			func: debounceLightMode,
			icon: () => (
				<BiAdjust size={20} style={lightMode && { transform: 'scaleX(-1)' }} />
			),
		},
		{
			name: 'Logout',
			func: handleLogout,
			icon: () => <MeetingRoomIcon />,
		},
	];

	return (
		<>
			{buttonsArray.map((button, index) => {
				return (
					<MenuItem key={button.name + index} onClick={button.func}>
						<StyledItem>
							{button.icon()}
							<p>{button.name}</p>
						</StyledItem>
					</MenuItem>
				);
			})}
		</>
	);
};

export default SettingButtons;

const StyledItem = styled.div`
	width: 120px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 32px;
	p {
		font-weight: 500;
	}
	button {
		background-color: transparent;
		color: black;
		padding: 8px;
	}
`;

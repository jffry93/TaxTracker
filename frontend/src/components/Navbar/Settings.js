import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStyleContext } from '../../hooks/useStyleHook';
import useDebounce from '../../hooks/useDebounce';

import { BiHome, BiUser, BiAdjust } from 'react-icons/bi';
import { useRef, useState } from 'react';

const Settings = () => {
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
	const { lightMode, setLightMode } = useStyleContext();
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const settingsButton = useRef(null);

	const handleClick = useDebounce(() => {
		setAnchorEl(settingsButton.current);
	});

	const handleClose = useDebounce(() => {
		setAnchorEl(null);
	});

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<IconButton
				aria-describedby={id}
				variant='contained'
				onClick={handleClick}
				color='inherit'
				ref={settingsButton}
			>
				<MoreIcon />
			</IconButton>

			<Popover
				id='long-menu'
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			>
				<MenuItem
					onClick={useDebounce(() => {
						console.log('yoooo');
						navigate('/');
					})}
				>
					<StyledItem>
						<BiHome size={20} />
						<p>Home</p>
					</StyledItem>
				</MenuItem>

				<MenuItem
					onClick={useDebounce(() => {
						console.log('yoooo');
						navigate('/account');
					})}
				>
					<StyledItem>
						<BiUser size={20} />
						<p>Profile</p>
					</StyledItem>
				</MenuItem>

				<div
					onClick={useDebounce(() => {
						console.log(lightMode);
						setLightMode(!lightMode);
					}, 500)}
				>
					<MenuItem>
						<StyledItem>
							<BiAdjust
								size={20}
								style={lightMode && { transform: 'scaleX(-1)' }}
							/>
							<p>{lightMode ? 'Dark' : 'Light'}</p>
						</StyledItem>
					</MenuItem>
				</div>
				{isAuthenticated ? (
					<MenuItem
						onClick={() => logout({ returnTo: window.location.origin })}
					>
						<StyledItem>
							<MeetingRoomIcon />
							<p>Logout</p>
						</StyledItem>
					</MenuItem>
				) : (
					<MenuItem onClick={() => loginWithRedirect()}>
						<StyledItem>
							<DoorBackIcon />
							<p>Login</p>
						</StyledItem>
					</MenuItem>
				)}
			</Popover>
		</div>
	);
};
export default Settings;

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

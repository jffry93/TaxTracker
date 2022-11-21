import * as React from 'react';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HomeIcon from '@mui/icons-material/Home';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Settings = () => {
	const { loginWithPopup, logout, isAuthenticated } = useAuth0();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div>
			<IconButton
				aria-describedby={id}
				variant='contained'
				onClick={handleClick}
				color='inherit'
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
				<Link to='/'>
					<MenuItem>
						<StyledItem>
							<HomeIcon />
							<p>Home</p>
						</StyledItem>
					</MenuItem>
				</Link>
				<Link to='/account'>
					<MenuItem>
						<StyledItem>
							<AccountCircle />
							<p>Profile</p>
						</StyledItem>
					</MenuItem>
				</Link>
				<Link to='/preferences'>
					<MenuItem>
						<StyledItem>
							<SettingsIcon />
							<p>Settings</p>
						</StyledItem>
					</MenuItem>
				</Link>
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
					<MenuItem onClick={() => loginWithPopup()}>
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
	width: 100%;
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

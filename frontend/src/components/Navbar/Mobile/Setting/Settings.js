import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import useDebounce from '../../../../hooks/useDebounce';
import { useRef, useState } from 'react';
import SettingsPopup from './SettingsPopup';

const Settings = () => {
	const [anchorEl, setAnchorEl] = useState(null);
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
			<SettingsPopup
				anchorEl={anchorEl}
				open={open}
				handleClose={handleClose}
			/>
		</div>
	);
};
export default Settings;

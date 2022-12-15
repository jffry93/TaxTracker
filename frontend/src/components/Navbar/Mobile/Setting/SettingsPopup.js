import Popover from '@mui/material/Popover';
import SettingButtons from './SettingButtons';

const SettingsPopup = ({ anchorEl, open, handleClose }) => {
	return (
		<Popover
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
			<SettingButtons />
		</Popover>
	);
};

export default SettingsPopup;

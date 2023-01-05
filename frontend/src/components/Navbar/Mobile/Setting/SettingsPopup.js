import Popover from '@mui/material/Popover';
import styled from 'styled-components';
import SettingButtons from './SettingButtons';

const SettingsPopup = ({ anchorEl, open, handleClose }) => {
	return (
		<StyledPopover
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
		</StyledPopover>
	);
};

export default SettingsPopup;

const StyledPopover = styled(Popover)`
	.css-3bmhjh-MuiPaper-root-MuiPopover-paper {
		background-color: unset;
	}
`;

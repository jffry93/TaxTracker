import { styled } from '@mui/material/styles';
import { useState } from 'react';

//Material UI Componenets
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import TemporaryDrawer from './TemporaryDrawer';
import Settings from './Settings';
import useDebounce from '../../hooks/useDebounce';
import TransactionModal from '../Modals/TransactionModal';

const MobileNav = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = useDebounce(() => setOpen(true));
	const handleClose = useDebounce(() => setOpen(false));

	return (
		<>
			<AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
				<Toolbar>
					<TemporaryDrawer />
					<StyledFab onClick={handleOpen} color='secondary' aria-label='add'>
						<AddIcon />
					</StyledFab>
					<Box sx={{ flexGrow: 1 }} />
					<Settings />
				</Toolbar>
			</AppBar>
			<TransactionModal
				handleClose={handleClose}
				open={open}
				setOpen={setOpen}
			/>
		</>
	);
};

export default MobileNav;

const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: '0 auto',
});

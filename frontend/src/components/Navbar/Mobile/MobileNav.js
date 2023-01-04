import { styled } from '@mui/material/styles';
//Material UI Componenets
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import TemporaryDrawer from './Drawer/TemporaryDrawer';
import Settings from './Setting/Settings';
import useDebounce from '../../../hooks/useDebounce';
import TransactionModal from '../../Modals/TransactionModal';
import { useTransactionContext } from '../../../hooks/useTransactionHook';

const MobileNav = () => {
	const { openForm, setOpenForm } = useTransactionContext();
	const handleOpen = useDebounce(() => setOpenForm(true));
	const handleClose = useDebounce(() => setOpenForm(false));

	return (
		<>
			<AppBar
				position='fixed'
				color='primary'
				sx={{ top: 'auto', bottom: 0, backgroundColor: 'var(--primary)' }}
			>
				<Toolbar>
					<TemporaryDrawer />
					<StyledFab
						onClick={handleOpen}
						sx={{ backgroundColor: 'var(--primary)' }}
						color='secondary'
						aria-label='add'
					>
						<AddIcon />
					</StyledFab>
					<Box sx={{ flexGrow: 1 }} />
					<Settings />
				</Toolbar>
			</AppBar>
			<TransactionModal
				handleClose={handleClose}
				open={openForm}
				setOpen={setOpenForm}
			/>
		</>
	);
};

export default MobileNav;

const StyledFab = styled(Fab)`
	position: absolute;
	z-index: 1;
	top: -30px;
	left: 0;
	right: 0;
	margin: 0 auto;
	&:hover {
		background-color: var(--primary-accent);
	}
`;

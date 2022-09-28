import { styled } from '@mui/material/styles';
import { useState } from 'react';
import TransactionForm from '../Transactions/TransactionsForm';
//Material UI Componenets
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import IconButton from '@mui/material/IconButton';

import Fab from '@mui/material/Fab';

import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TemporaryDrawer from './TemporaryDrawer';
import Settings from './Settings';
import FormModal from './FormModal';
import { useAuth0 } from '@auth0/auth0-react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, isAuthenticated, isLoading } = useAuth0();

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
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <StyledBox>{isAuthenticated && <TransactionForm />}</StyledBox>
      </Modal>
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

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #615d6c;
  border-radius: 1rem;

  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

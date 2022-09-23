import { styled } from '@mui/material/styles';
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
import { useState } from 'react';
import TemporaryDrawer from './TemporaryDrawer';
import Settings from './Settings';

const MobileNav = () => {
  return (
    <>
      <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <TemporaryDrawer />
          <StyledFab color='secondary' aria-label='add'>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <Settings />
        </Toolbar>
      </AppBar>
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

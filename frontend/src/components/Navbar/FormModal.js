import * as React from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { ClickAwayListener } from '@mui/material';
// import ClickAwayListener from '@mui/material/ClickAwayListener';

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

const FormModal = ({ open, setOpen }) => {
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      <AddIcon />

      <Modal
        keepMounted
        open={open}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Box sx={style}>
          <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default FormModal;

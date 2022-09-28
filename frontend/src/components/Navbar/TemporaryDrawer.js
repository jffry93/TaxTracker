import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';
import TransactionCard from '../Transactions/TransactionCard';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import styled from 'styled-components';

const TemporaryDrawer = () => {
  const { transactions, paymentTotal, dispatch, postDeduction } =
    useTransactionContext();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100%' }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <StyledContainer>
        <div>
          <label for='card-types'>Filter</label>
          <select
            id='filter-input'
            name='card-types'
            onClick={(e) => e.stopPropagation()}
          >
            <option value='purchase'>All</option>
            <option value='purchase'>Purchases</option>
            <option value='payment'>Payments</option>
          </select>
        </div>
        <div>
          <label for='sort'>Sort</label>
          <select id='sort' name='sort' onClick={(e) => e.stopPropagation()}>
            <option value='volvo'>Recent</option>
            <option value='saab'>High - Low</option>
            <option value='fiat'>Low - High</option>
          </select>
        </div>
      </StyledContainer>
      <Divider />
      {/* content inside the sidebar */}
      <StyledCards>
        {transactions &&
          transactions.map((transaction) => {
            // console.log(transaction);
            return (
              <TransactionCard
                key={transaction._id}
                transaction={transaction}
              />
            );
          })}
      </StyledCards>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer('left', true)}
        color='inherit'
        aria-label='open drawer'
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        PaperProps={{
          sx: { width: '80vw' },
        }}
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        {list('left')}
      </Drawer>
    </>
  );
};

export default TemporaryDrawer;

const StyledCards = styled.div`
  padding: 60px 24px 68px;

  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 24px;
`;
const StyledContainer = styled.div`
  display: flex;
  gap: 16px;

  padding: 0 16px 8px;
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    select {
      width: 100%;
    }
  }
`;

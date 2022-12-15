import * as React from 'react';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../../../../hooks/useDebounce';
import '../../../../styles/MaterialSelect.css';
import DrawerList from './DrawerList';

const TemporaryDrawer = () => {
	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const debounceOpenDrawer = useDebounce(() =>
		setState({ ...state, left: true })
	);
	const debounceCloseDrawer = useDebounce(() =>
		setState({ ...state, left: false })
	);

	return (
		<>
			<IconButton
				// disabled={!isAuthenticated}
				onClick={debounceOpenDrawer}
				color='inherit'
				aria-label='open drawer'
			>
				<MenuIcon />
			</IconButton>
			<StyledDrawer
				PaperProps={{
					sx: { width: '100vw', backgroundColor: 'transparent' },
				}}
				anchor={'left'}
				open={state['left']}
				onClose={debounceCloseDrawer}
			>
				<DrawerList anchor={'left'} debounceCloseDrawer={debounceCloseDrawer} />
			</StyledDrawer>
		</>
	);
};

export default TemporaryDrawer;

const StyledDrawer = styled(Drawer)`
	background-color: transparent;
`;

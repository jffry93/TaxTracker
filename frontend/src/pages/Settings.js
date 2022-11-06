import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext } from 'react';
import styled from 'styled-components';
import { DemoContext } from '../context/DemoContext';
import useDebounce, { helloFunc, byeFunc } from '../hooks/useDebounce';

const Settings = () => {
	const [age, setAge] = React.useState('');

	const obj = useContext(DemoContext);
	// console.log(obj);
	console.log('settings');
	return (
		<StyledDiv>
			<h2>Settings</h2>

			{/* <Box sx={{ minWidth: 120 }}> */}
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Age</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={age}
					label='Age'
					onChange={(e) => setAge(e.target.value)}
				>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem>
				</Select>
			</FormControl>
			{/* </Box> */}
		</StyledDiv>
	);
};

export default Settings;

const StyledDiv = styled.div`
	width: 300px;
	position: relative;
	font-family: Arial;
	select {
		display: none; /*hide original SELECT element: */
	}

	.select-selected {
		background-color: DodgerBlue;
	}
`;

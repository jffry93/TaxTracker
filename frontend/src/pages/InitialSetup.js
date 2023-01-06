import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';
import InitialForm from '../components/InitialForm/InitialForm';
import { motion } from 'framer-motion';
import { pageAnimation } from '../styles/StyledAnimations';

const InitialSetup = () => {
	const [emptyFields, setEmptyFields] = useState([]);
	const [formLocation, setFormLocation] = useState('');

	useEffect(() => {
		return () => {
			setEmptyFields([]);
			setFormLocation('');
		};
	}, []);

	return (
		<StyledInit variants={pageAnimation} initial='hidden' animate='show'>
			<h1>Where are you located?</h1>
			<h2>It's for tax purposes...</h2>
			<InitialForm
				formLocation={formLocation}
				emptyFields={emptyFields}
				setEmptyFields={setEmptyFields}
				setFormLocation={setFormLocation}
			/>
		</StyledInit>
	);
};

export default InitialSetup;

const StyledInit = styled(motion.div)`
	/* background-color: black; */
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	justify-content: center;
	gap: 16px;

	height: 100%;
	min-height: 100vh;
	/* border: 1px solid green; */
	padding: 64px 32px;
`;

import { useEffect } from 'react';
import styled from 'styled-components';

const Settings = () => {
	useEffect(() => {
		fetch('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3')
			.then(function (response) {
				return response.json();
			})
			.then(function (response) {
				// handle ten random cards
				console.log(response);
			})
			.catch(function (error) {
				// handle what went wrong
			});
	}, []);
	return (
		<StyledDiv>
			<h2>Settings</h2>
		</StyledDiv>
	);
};

export default Settings;

const StyledDiv = styled.div`
	border: 1px solid red;
`;

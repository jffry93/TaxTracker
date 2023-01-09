import React from 'react';
import styled from 'styled-components';

const Desktop = () => {
	return (
		<StyledSpline>
			<iframe
				title='mobile app example'
				src='https://my.spline.design/iphone14procopy-cbdc17b3e3d0560670a2b37b40ca9186/'
				// frameborder='0'
				width='100%'
				height='100%'
			></iframe>
		</StyledSpline>
	);
};

export default Desktop;

const StyledSpline = styled.div`
	display: none;
	height: 100vh;
	&:before {
		content: '';
		width: 150px;
		height: 40px;
		right: 10px;
		bottom: 20px;
		background-color: #e8c7dd;
		position: fixed;
	}
	@media (min-width: 600px) {
		display: block;
	}
`;

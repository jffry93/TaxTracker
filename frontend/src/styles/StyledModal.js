import { Box, Modal } from '@mui/material';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
	background-color: rgba(0, 0, 0, 0.75);
	height: 101vh;
	box-shadow: none !important;
`;

export const StyledDeleteBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #1e1e1e;
	border-radius: 12px;
	padding: 48px 32px 60px;
	h2 {
		min-width: 250px;
	}
	h2:first-child {
		margin-bottom: 16px;
	}
	.button-container {
		display: flex;
		gap: 8px;
		margin-top: 32px;
		button {
			flex: 1;
		}
	}
`;

export const StyledImageBox = styled(Box)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	padding: 32px;
	img {
		width: 100%;
	}
`;

import { InputLabel } from '@mui/material';
import styled from 'styled-components';

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 16px;
	button,
	div {
		width: 100%;
	}
`;

export const StyledInput = styled(InputLabel)`
	width: 150px;
	span {
		position: relative;
		top: -5px;
		left: 5px;
		font-size: 12px;
	}
`;

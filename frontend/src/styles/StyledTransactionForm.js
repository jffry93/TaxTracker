import { TextField } from '@mui/material';
import styled from 'styled-components';

export const StyledMain = styled.div`
	flex: 1;
	width: 100%;
	button {
		font-size: 14px;
		height: 51px;
	}
	.secondary-btn {
		background-color: var(--wave-color-3);
		&:hover {
			background-color: var(--secondary);
		}
	}

	.button-container {
		margin: 16px 16px;
		display: flex;
		justify-content: space-between;
		gap: 16px;
		h2 {
			display: flex;
			flex-direction: column;
		}
	}
`;

export const StyledForm = styled.form`
	.form-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: var(--wave-text);
		padding: 0 16px 32px 16px;
		label {
			font-size: 12px;
			margin-bottom: 2px;
			color: var(--wave-text);
		}
		input {
			padding: 14px 16.5px;
			color: var(--wave-text);
		}

		input::placeholder {
			font: 14px/3 sans-serif;
		}
		/* Chrome, Safari, Edge, Opera */
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		/* Firefox */
		input[type='number'] {
			-moz-appearance: textfield;
		}
	}
	.top-section {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;

		.first-item {
			width: 100%;
			.MuiFormControl-root {
				width: 100%;
			}
		}
		.second-item {
			div {
				width: 100px;
			}
		}
	}
`;

export const StyledBtnDiv = styled.div`
	display: flex;
	gap: 8px;
	button {
		flex: 1;
	}
`;

export const StyledImgDiv = styled.div`
	div {
		width: 100%;
	}
	input {
		width: 100%;
		height: 23px;
		font-size: 11px;
		color: ${(props) =>
			props.errorStatus ? 'var(--error)' : 'var(--wave-text)'}!important;
	}
`;

export const StyledTextField = styled(TextField)`
	label {
		color: ${(props) =>
			props.error ? 'var(--error)' : 'var(--wave-text)'}!important;
	}
	.MuiOutlinedInput-root {
	}

	& label.Mui-focused {
		color: ${(props) => (props.error ? 'var(--error)' : 'var(--wave-text)')};
	}
	& .MuiOutlinedInput-root {
		& fieldset {
			border: 0.2px var(--wave-text) solid;
		}
		& fieldset:hover {
			border: 1px green solid;
		}
		&.Mui-focused fieldset {
			border: 0.2px
				${(props) => (props.error ? 'var(--error)' : 'var(--wave-text)')} solid;
		}
	}
`;

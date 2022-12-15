import styled from 'styled-components';

export const StyledMain = styled.div`
	flex: 1;
	min-width: clamp(270px, 80vw, 400px);
	width: 100%;
	color: white;
	.button-container {
		/* border: 5px solid red; */
		margin: 16px 16px;
		display: flex;
		justify-content: space-between;
		gap: 16px;
		h2 {
			display: flex;
			flex-direction: column;
		}
		button {
			height: 51px;
			font-size: 14px;
		}
	}
`;

export const StyledForm = styled.form`
	.form-container {
		display: flex;
		flex-direction: column;
		gap: 10px;

		padding: 0 16px 32px 16px;
		label {
			font-size: 12px;
			margin-bottom: 2px;
		}
		input {
			padding: 14px 16.5px;
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
		height: 51px;
		flex: 1;
		font-size: 14px;
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
		color: ${(props) => (props.errorStatus ? 'red' : 'black')};
	}
`;

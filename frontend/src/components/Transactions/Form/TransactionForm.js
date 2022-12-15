import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import handleImgToBase64 from '../../../utils/handleImgToBase64';

const TransactionForm = ({
	handleDebounce,
	handleClose,
	emptyFields,
	client,
	setClient,
	amount,
	setAmount,
	setTitle,
	title,
	description,
	setDescription,
	setImage,
	imageValue,
	setImageValue,
}) => {
	return (
		<StyledForm
			onSubmit={(e) => {
				e.preventDefault();
				handleDebounce();
			}}
		>
			<div className='form-container'>
				<div className='top-section'>
					<div className='info-container first-item'>
						<TextField
							type='text'
							onChange={(e) => setClient(e.target.value)}
							value={client}
							id='outlined-basic'
							label='Client'
							variant='outlined'
						/>
					</div>
					<div className='info-container second-item'>
						<TextField
							error={emptyFields.includes('amount') ? true : false}
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							id='outlined-number'
							label={emptyFields.includes('amount') ? 'How much?' : 'Number'}
							type='number'
						/>
					</div>
				</div>
				<TextField
					error={emptyFields.includes('title') ? true : false}
					onChange={(e) => setTitle(e.target.value)}
					value={title}
					id='outlined-number'
					label={
						emptyFields.includes('title') ? "What'd you buy?" : 'Purchase Title'
					}
					type='text'
				/>
				<TextField
					error={emptyFields.includes('description') ? true : false}
					id='outlined-multiline-flexible'
					label={
						emptyFields.includes('description')
							? 'Purpose for purchase?'
							: 'Description'
					}
					multiline
					maxRows={4}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<StyledImgDiv errorStatus={emptyFields.includes('image')}>
					<TextField
						error={emptyFields.includes('image') ? true : false}
						label={emptyFields.includes('image') ? 'Add an Image' : 'Document'}
						value={imageValue}
						type='file'
						accept='image/*'
						onChange={(e) => {
							setImage(handleImgToBase64(e.target.files[0], setImage));
							setImageValue(e.target.value);
						}}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</StyledImgDiv>
				<StyledBtnDiv>
					<button type='submit'>Add Purchase</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							handleClose();
						}}
					>
						Cancel
					</button>
				</StyledBtnDiv>
			</div>
		</StyledForm>
	);
};

export default TransactionForm;

const StyledForm = styled.form`
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

const StyledBtnDiv = styled.div`
	display: flex;
	gap: 8px;
	button {
		height: 51px;
		flex: 1;
		font-size: 14px;
	}
`;

const StyledImgDiv = styled.div`
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

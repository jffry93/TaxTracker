import styled from 'styled-components';
import { RiErrorWarningLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import useDebounce from '../../hooks/useDebounce';
import { useAuth0 } from '@auth0/auth0-react';
import TextField from '@mui/material/TextField';

const TransactionForm = ({ open, setOpen }) => {
	const { dispatch } = useTransactionContext();
	//form values
	const [client, setClient] = useState('');
	const [title, setTitle] = useState('');
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [type, setType] = useState('payment');
	//cloudinary
	const [imageValue, setImageValue] = useState('');
	const [image, setImage] = useState(null);

	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);
	const { user, isAuthenticated, isLoading } = useAuth0();

	//MONGODB
	let transactions = {
		user: user.email,
		client,
		title,
		amount,
		description,
		type,
		imageValue,
		image,
	};

	const handleAddToDB = async () => {
		const response = await fetch('/api/transactions', {
			method: 'POST',
			body: JSON.stringify(transactions),
			headers: {
				'Content-type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			setError(json.error);
			setEmptyFields(json.emptyFields);
		}
		if (response.ok) {
			setClient('');
			setTitle('');
			setAmount('');
			setDescription('');
			setImage(null);
			setImageValue('');
			setError(null);
			setEmptyFields([]);
			console.log('New Transactions added', json);
			dispatch({
				type: 'CREATE_TRANSACTIONS',
				payload: json.transaction,
				paymentTotal: json.paymentTotal,
				purchaseTotal: json.purchaseTotal,
				provTax: json.provTax,
				fedTax: json.fedTax,
				postDeduction: json.postDeduction,
			});
			if (open) {
				setOpen(false);
			}
		}
	};

	const handleImgToBase64 = (file) => {
		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setImage(reader.result);
			};
			return reader;
		}
	};

	const handleDebounce = useDebounce(() => {
		handleAddToDB();
	}, 500);

	return (
		<StyledMain>
			<div className='button-container'>
				<h2>
					Add New <span>{type === 'payment' ? 'Invoice' : 'Receipt'}</span>
				</h2>
				{type === 'payment' ? (
					<button onClick={() => setType('purchase')}>Receipt</button>
				) : (
					<button onClick={() => setType('payment')}>Invoice</button>
				)}
			</div>
			<StyledForm
				onSubmit={(e) => {
					e.preventDefault();
					handleDebounce();
				}}
			>
				<div className='form-container'>
					<div className='top-section'>
						{/* CLIENT */}
						<div className='info-container first-item'>
							{/* <label>Client:</label> */}
							{/* <input
								type='text'
								onChange={(e) => setClient(e.target.value)}
								placeholder='Item on receipt'
								value={client}
							/> */}
							<TextField
								type='text'
								onChange={(e) => setClient(e.target.value)}
								value={client}
								id='outlined-basic'
								label='Client'
								variant='outlined'
							/>
						</div>
						{/* FUNDS */}
						<div className='info-container second-item'>
							<TextField
								error={emptyFields.includes('amount') ? true : false}
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								id='outlined-number'
								label={emptyFields.includes('amount') ? 'How much?' : 'Number'}
								type='number'
								// InputLabelProps={{
								// 	shrink: true,
								// }}
							/>
							{/* <input
								type='number'
								onChange={(e) => setAmount(e.target.value)}
								placeholder='Amount spent'
								value={amount}
								className={emptyFields.includes('amount') ? 'error' : ''}
							/> */}
						</div>
					</div>
					{/* TITLE LABEL AND INPUT */}
					{/* <label className={emptyFields.includes('title') ? 'error-text' : ''}>
						{emptyFields.includes('title') ? (
							<div className='error-text'>
								<RiErrorWarningLine size={24} />
								<p>What'd you buy?</p>
								<RiErrorWarningLine size={24} />
							</div>
						) : (
							<p>
								Purchase Title<span>*</span>
							</p>
						)}
					</label> */}
					<TextField
						error={emptyFields.includes('title') ? true : false}
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						id='outlined-number'
						label={
							emptyFields.includes('title')
								? "What'd you buy?"
								: 'Purchase Title'
						}
						type='text'
					/>
					{/* <input
						type='text'
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Item on receipt'
						value={title}
						className={emptyFields.includes('title') ? 'error' : ''}
					/> */}
					{/* DESCRIPTION LABEL AND INPUT */}
					{/* <label
						className={emptyFields.includes('description') ? 'error-text' : ''}
					>
						{emptyFields.includes('description') ? (
							<div className='error-text'>
								<RiErrorWarningLine size={24} />
								<p>Why'd you spend moneyz?</p>
								<RiErrorWarningLine size={24} />
							</div>
						) : (
							<p>
								Description<span>*</span>
							</p>
						)}
					</label> */}
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
					{/* <input
						type='text'
						onChange={(e) => setDescription(e.target.value)}
						placeholder='Purpose for purchase'
						value={description}
						className={emptyFields.includes('description') ? 'error' : ''}
					/> */}
					<StyledImgDiv errorStatus={emptyFields.includes('image')}>
						<TextField
							error={emptyFields.includes('image') ? true : false}
							// label='Document'
							label={
								emptyFields.includes('image') ? 'Add an Image' : 'Document'
							}
							value={imageValue}
							type='file'
							accept='image/*'
							onChange={(e) => {
								setImage(handleImgToBase64(e.target.files[0]));
								setImageValue(e.target.value);
							}}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</StyledImgDiv>
					<StyledBtnDiv>
						<button>Add Purchase</button>
						<button>Cancel</button>
					</StyledBtnDiv>
				</div>
			</StyledForm>
		</StyledMain>
	);
};

export default TransactionForm;

const StyledMain = styled.div`
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
			/* border: 1px solid var(--vivid-pink); */
			padding: 14px 16.5px;
		}

		input::placeholder {
			/* padding: 4px; */
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
		.error {
			border: 1px solid var(--vivid-pink);
			border-radius: 4px;
			display: flex;
			justify-content: space-between;
		}
		.error-text {
			display: flex;
			justify-content: space-between;
			gap: 8px;

			color: var(--vivid-pink);
			margin: 0;
			width: 100%;
		}
		.error-message {
			display: flex;
			align-items: center;
			gap: 8px;

			border-radius: 8px;
			background-color: var(--vivid-pink);
			color: var(--off-white);

			margin-top: 16px;
			padding: 32px 16px;

			text-align: center;
			font-size: 17px;
			.rotate {
				transform: rotate(180deg);
			}
		}
	}
	.top-section {
		display: flex;
		align-items: center;
		gap: 8px;
		.info-container {
			flex: 1;
			/* width: 200px; */
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

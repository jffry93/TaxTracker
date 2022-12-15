import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useTransactionContext } from '../../../hooks/useTransactionHook';
import useDebounce from '../../../hooks/useDebounce';
import { useAuth0 } from '@auth0/auth0-react';
import TransactionForm from './TransactionForm';

const TransactionFormContainer = ({ open, setOpen, handleClose }) => {
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
	const [emptyFields, setEmptyFields] = useState([]);
	const { user } = useAuth0();

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

	const clearForm = () => {
		setClient('');
		setTitle('');
		setAmount('');
		setDescription('');
		setImage(null);
		setImageValue('');
		setEmptyFields([]);
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
			// setError(json.error);
			setEmptyFields(json.emptyFields);
		}
		if (response.ok) {
			clearForm();
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

	const handleDebounce = useDebounce(() => {
		handleAddToDB();
	}, 500);

	const debounceType = useDebounce(() => {
		type === 'payment' ? setType('purchase') : setType('payment');
	});

	useEffect(() => {
		console.log('mount');
		return () => {
			console.log('unmount');
			clearForm();
		};
	}, []);

	return (
		<StyledMain>
			<div className='button-container'>
				<h2>
					Add New <span>{type === 'payment' ? 'Invoice' : 'Receipt'}</span>
				</h2>
				<button onClick={debounceType}>
					{type === 'payment' ? 'Invoice' : 'Receipt'}
				</button>
			</div>
			<TransactionForm
				handleDebounce={handleDebounce}
				handleClose={handleClose}
				emptyFields={emptyFields}
				client={client}
				setClient={setClient}
				amount={amount}
				setAmount={setAmount}
				setTitle={setTitle}
				title={title}
				description={description}
				setDescription={setDescription}
				setImage={setImage}
				imageValue={imageValue}
				setImageValue={setImageValue}
			/>
		</StyledMain>
	);
};

export default TransactionFormContainer;

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

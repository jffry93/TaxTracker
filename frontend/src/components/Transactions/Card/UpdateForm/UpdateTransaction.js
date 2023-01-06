import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import {
	StyledForm,
	StyledTop,
	StyledButtonContainer,
} from '../../../../styles/StyledCard';
import { useTransactionContext } from '../../../../hooks/useTransactionHook';
import useDebounce from '../../../../hooks/useDebounce';

const UpdateTransaction = ({
	transaction,
	setShowUpdate,
	setIsOpen,
	toggleUpdate,
}) => {
	const { dispatch, filterType, sortType } = useTransactionContext();
	const [emptyFields, setEmptyFields] = useState([]);
	const [title, setTitle] = useState(transaction.title);
	const [client, setClient] = useState(transaction.client);
	const [amount, setAmount] = useState(transaction.amount);
	const [description, setDescription] = useState(transaction.description);

	const handleUpdate = async () => {
		const res = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				`/api/transactions/${transaction._id}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					// ...transaction,
					title,
					client,
					amount,
					description,
				}),
				headers: {
					'Content-type': 'application/json',
				},
			}
		);
		const json = await res.json();
		// console.log(json);
		setShowUpdate(false);
		dispatch({
			type: 'UPDATE_TRANSACTIONS',
			payload: json.transactions,
			paymentTotal: json.paymentTotal,
			purchaseTotal: json.purchaseTotal,
			provTax: json.provTax,
			fedTax: json.fedTax,
			postDeduction: json.postDeduction,
			filter: filterType,
			sort: sortType,
		});
		setIsOpen(false);
		// console.log(filterType);
		// console.log(sortType);
	};

	const debounceClose = useDebounce(() => setShowUpdate(false));
	const debounceUpdate = useDebounce(handleUpdate);

	return (
		<StyledForm
			onClick={(e) => {
				e.stopPropagation();
			}}
			onSubmit={(e) => {
				e.preventDefault();
				debounceUpdate();
			}}
		>
			<StyledTop>
				<TextField
					value={client}
					error={emptyFields.includes('client') ? true : false}
					id='outlined-number'
					className='client-input'
					label={emptyFields.includes('client') ? "What'd you buy?" : 'Client'}
					type='text'
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={(e) => {
						e.stopPropagation();
						setClient(e.target.value);
					}}
				/>
				<TextField
					value={amount}
					error={emptyFields.includes('amount') ? true : false}
					className='amount-input'
					id='outlined-number'
					label={emptyFields.includes('amount') ? "What'd you buy?" : 'Amount'}
					type='number'
					onClick={(e) => {
						e.stopPropagation();
					}}
					onChange={(e) => {
						e.stopPropagation();
						setAmount(e.target.value);
					}}
				/>
			</StyledTop>
			<TextField
				className='title-input'
				error={emptyFields.includes('title') ? true : false}
				onClick={(e) => {
					e.stopPropagation();
				}}
				onChange={(e) => {
					e.stopPropagation();
					setTitle(e.target.value);
				}}
				value={title}
				id='outlined-number'
				label={
					emptyFields.includes('title') ? "What'd you buy?" : 'Purchase Title'
				}
				type='text'
			/>
			<TextField
				multiline
				rows={2}
				className='description-input'
				value={description}
				error={emptyFields.includes('description') ? true : false}
				id='outlined-multiline-flexible'
				label={
					emptyFields.includes('description')
						? "What'd you buy?"
						: 'Description'
				}
				type='text'
				onClick={(e) => {
					e.stopPropagation();
				}}
				onChange={(e) => {
					e.stopPropagation();
					setDescription(e.target.value);
				}}
			/>
			<StyledButtonContainer>
				<button type='submit'>Update</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						debounceClose();
					}}
				>
					Cancel
				</button>
			</StyledButtonContainer>
		</StyledForm>
	);
};

export default UpdateTransaction;

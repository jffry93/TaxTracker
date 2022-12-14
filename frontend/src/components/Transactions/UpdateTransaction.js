import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { useTransactionContext } from '../../hooks/useTransactionHook';

const UpdateTransaction = ({ transaction, setShowUpdate, setIsOpen }) => {
	const { dispatch, filterType, sortType } = useTransactionContext();
	const [emptyFields, setEmptyFields] = useState([]);
	const [title, setTitle] = useState(transaction.title);
	const [client, setClient] = useState(transaction.client);
	const [amount, setAmount] = useState(transaction.amount);
	const [description, setDescription] = useState(transaction.description);

	const handleSubmit = (e) => {
		e.preventDefault();

		const handleUpdate = async () => {
			const res = await fetch(`/api/transactions/${transaction._id}`, {
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
			});
			const json = await res.json();
			console.log(json);
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
			console.log(filterType);
			console.log(sortType);
			// dispatch({ type: 'FILTER_TRANSACTIONS', payload: filterType });
			// dispatch({ type: 'SORT_TRANSACTIONS', payload: sortType });
		};
		handleUpdate();
	};

	return (
		<StyledForm
			onClick={(e) => {
				e.stopPropagation();
			}}
			onSubmit={handleSubmit}
		>
			<TextField
				value={client}
				error={emptyFields.includes('client') ? true : false}
				id='outlined-number'
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
				value={amount}
				error={emptyFields.includes('amount') ? true : false}
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
			<TextField
				value={description}
				error={emptyFields.includes('description') ? true : false}
				id='outlined-number'
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
			<div>
				<button type='submit'>Update</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setShowUpdate(false);
						// handleClose();
					}}
				>
					Cancel
				</button>
			</div>
		</StyledForm>
	);
};

export default UpdateTransaction;

const StyledForm = styled.form`
	width: 100%;
	border: 1px solid red;
`;

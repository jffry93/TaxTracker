import React, { useEffect, useState } from 'react';
import { useTransactionContext } from '../../../hooks/useTransactionHook';
import useDebounce from '../../../hooks/useDebounce';
import { useAuth0 } from '@auth0/auth0-react';
import TransactionForm from './TransactionForm';
import TypeContainer from './TypeContainer';
import addTransaction from '../../../utils/addTransaction';
import { StyledMain } from '../../../styles/StyledTransactionForm';

const TransactionFormContainer = ({ open, setOpen, handleClose }) => {
	const { dispatch } = useTransactionContext();
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

	const handleDebounce = useDebounce(() => {
		addTransaction(
			transactions,
			setEmptyFields,
			clearForm,
			dispatch,
			open,
			setOpen
		);
	}, 500);

	const debounceType = useDebounce(() => {
		type === 'payment' ? setType('purchase') : setType('payment');
	});

	useEffect(() => {
		return () => {
			clearForm();
		};
	}, []);

	return (
		<StyledMain>
			<TypeContainer type={type} debounceType={debounceType} />
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

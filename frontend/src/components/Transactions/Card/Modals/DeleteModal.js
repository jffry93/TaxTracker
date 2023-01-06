import React from 'react';
import { useTransactionContext } from '../../../../hooks/useTransactionHook';
import useDebounce from '../../../../hooks/useDebounce';
import { StyledModal, StyledDeleteBox } from '../../../../styles/StyledModal';

const DeleteModal = ({ showDelete, setShowDelete, transaction }) => {
	const { dispatch } = useTransactionContext();

	const handleDelete = async () => {
		const response = await fetch(
			process.env.REACT_APP_BACKEND_URL +
				`/api/transactions/${transaction._id}?public=${transaction.imageData.public_id}`,
			{
				method: 'DELETE',
				body: transaction,
			}
		);
		const json = await response.json();
		console.log(json);
		if (response.ok) {
			dispatch({
				type: 'DELETE_TRANSACTIONS',
				payload: json.transaction,
				paymentTotal: json.paymentTotal,
				purchaseTotal: json.purchaseTotal,
				provTax: json.provTax,
				fedTax: json.fedTax,
				postDeduction: json.postDeduction,
			});
			// setYouSure(true);
		}
	};

	const debounceDelete = useDebounce(handleDelete, 500);
	const closeDeleteModal = useDebounce(() => setShowDelete(false));

	return (
		<StyledModal
			open={showDelete}
			onClose={(e) => {
				e.stopPropagation();
				closeDeleteModal();
			}}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<StyledDeleteBox
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h2>This will permanently delete the data.</h2>
				<h2>Are you sure?</h2>
				<div className='button-container'>
					<button
						className='secondary'
						onClick={(e) => {
							e.stopPropagation();
							debounceDelete();
						}}
					>
						Confirm
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							closeDeleteModal();
						}}
					>
						Abort
					</button>
				</div>
			</StyledDeleteBox>
		</StyledModal>
	);
};

export default DeleteModal;

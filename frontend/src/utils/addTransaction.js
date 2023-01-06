export const addTransaction = async (
	transactions,
	setEmptyFields,
	clearForm,
	dispatch,
	open,
	setOpen
) => {
	const response = await fetch(
		process.env.REACT_APP_BACKEND_URL + '/api/transactions',
		{
			method: 'POST',
			body: JSON.stringify(transactions),
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
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

export default addTransaction;

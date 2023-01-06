const updateTransaction = async (userInfo, callback) => {
	const response = await fetch(
		process.env.REACT_APP_BACKEND_URL + '/api/transactions/user',
		{
			method: 'POST',
			body: JSON.stringify(userInfo),
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
	const json = await response.json();

	if (response.ok) {
		callback({
			type: 'SET_TRANSACTIONS',
			transactions: json.transactions,
			paymentTotal: json.paymentTotal,
			purchaseTotal: json.purchaseTotal,
			provTax: json.provTax,
			fedTax: json.fedTax,
			postDeduction: json.postDeduction,
		});
	}
};

export default updateTransaction;

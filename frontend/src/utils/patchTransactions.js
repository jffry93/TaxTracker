const patchTransaction = async (userInfo, callback) => {
	const response = await fetch('/api/transactions/user', {
		method: 'POST',
		body: JSON.stringify(userInfo),
		headers: {
			'Content-type': 'application/json',
		},
	});
	const json = await response.json();
	// console.log(json.paymentTotal - json.purchaseTotal);
	// console.log(json.provTax + json.fedTax + json.postDeduction);

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

export default patchTransaction;

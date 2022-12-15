const fetchInitialTransactions = async (user, callback, callback2) => {
	try {
		const response = await fetch('/api/transactions/user', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-type': 'application/json',
			},
		});
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
			callback2({ type: 'CHECK_TRANSACTIONS', check: 'verified' });
		} else {
			callback2({ type: 'FAILED' });
			callback2({ type: 'CHECK_TRANSACTIONS', check: 'checked' });
		}
	} catch (err) {
		console.log('Whooops');
	}
};

export default fetchInitialTransactions;

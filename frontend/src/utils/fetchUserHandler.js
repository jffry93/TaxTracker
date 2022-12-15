const fetchGetHandler = async (user, callback) => {
	try {
		const res = await fetch('/api/user/', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-type': 'application/json',
			},
		});
		const data = await res.json();
		console.log(data);
		callback({ type: 'LOG_ON', user: data.user });
	} catch (err) {
		console.log('there was an error fetching the user data from mongo', err);
	}
};

export default fetchGetHandler;

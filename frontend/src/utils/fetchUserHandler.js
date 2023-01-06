const fetchGetHandler = async (user, callback, callback2) => {
	try {
		const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user/', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const data = await res.json();

		callback({ type: 'LOG_ON', user: data.user });
		callback2(data.user.lightTheme);
	} catch (err) {
		console.log('there was an error fetching the user data from mongo', err);
	}
};

export default fetchGetHandler;

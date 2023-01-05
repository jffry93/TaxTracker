const fetchGetHandler = async (user, callback, callback2) => {
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
		callback2(data.user.lightTheme);
	} catch (err) {
		console.log('there was an error fetching the user data from mongo', err);
	}
};

export default fetchGetHandler;

const updateLocation = async (formData, email, dispatch, callback) => {
	const res = await fetch('/api/user/', {
		method: 'PATCH',
		body: JSON.stringify({ ...formData, email }),
		headers: {
			'Content-type': 'application/json',
		},
	});
	const data = await res.json();
	callback();
	dispatch({ type: 'UPDATE_USER', user: { ...data } });
};

export default updateLocation;

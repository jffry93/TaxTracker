export const initialLocation = async (
	formLocation,
	formData,
	email,
	callback,
	setError,
	navigate
) => {
	console.log(formLocation);

	if (formLocation.length) {
		const res = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/user/', {
			method: 'PATCH',
			body: JSON.stringify({ ...formData, email }),
			headers: {
				'Content-type': 'application/json',
			},
		});
		const data = await res.json();

		callback({ type: 'UPDATE_USER', user: { ...data } });
		navigate('/');
	} else {
		setError(['location']);
	}
};

export default initialLocation;

const updateLocation = async (
	formData,
	email,
	dispatch,
	callback,
	imageValue
) => {
	console.log(formData);
	const res = await fetch('/api/user/', {
		method: 'PATCH',
		body: JSON.stringify({ ...formData, email, imageValue }),
		headers: {
			'Content-type': 'application/json',
		},
	});
	const data = await res.json();
	callback();
	dispatch({ type: 'UPDATE_USER', user: { ...data } });
};

export default updateLocation;

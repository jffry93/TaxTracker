const handleImgToBase64 = (file, callback) => {
	const reader = new FileReader();
	if (file) {
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			callback(reader.result);
		};
		return reader;
	}
};

export default handleImgToBase64;

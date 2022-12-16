export const getPercentage = (number, total) => {
	// Calculate the percentage by dividing the number by the total and multiplying by 100
	const percent = (number / total) * 100;

	// Return the percentage as a string with the percent sign
	return Math.round(percent) + '%';
};

export default getPercentage;

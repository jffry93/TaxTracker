const { federal, provincial } = require('./taxBuckets');

const calcTax = (amount, tax) => {
	taxDiff = amount * tax;
	tax = taxDiff - amount;
	return {
		amount: amount - tax,
		tax,
	};
};

const taxDue = (income, taxType) => {
	let total = income; //value of total to retun
	let tax = 0; //tax data to retun
	let amountRemaining = income; // total changing through loop
	//if the user will only fill 1 bucket
	if (income <= taxType[0].amount) {
		data = calcTax(income, taxType[0].tax);
		total = data.amount;
		tax = data.tax;
	} else {
		//if user is making more than first bracket
		const fedBuckets = taxType.forEach((bucket, index, ogArr) => {
			//IF CONDITION FOR FINAL LOOP
			if (
				index === taxType.length - 1 &&
				income >= ogArr[taxType.length - 1].amount
			) {
				const data = calcTax(amountRemaining, bucket.tax);
				// console.log(total);
				// console.log(tax);
				total += data.amount;
				tax += data.tax;
				// console.log(amountRemaining, 'remaining amount on final loop');
				// console.log(total + tax, income);
				return;
			}
			//IF CONDITION FOR FIRST LOOP
			if (index < 1) {
				amountRemaining -= bucket.amount;
				const data = calcTax(bucket.amount, bucket.tax);
				total = data.amount;
				tax = data.tax;
			} else {
				//ALL THE OTHER BUCKETS
				const bucketDiff = bucket.amount - ogArr[index - 1].amount;
				//block of code that runs if bucket does NOT overflow
				if (amountRemaining <= bucketDiff && amountRemaining > 0) {
					const data = calcTax(amountRemaining, bucket.tax);
					// console.log(data);
					total += data.amount;
					tax += data.tax;
					// console.log(tax, 'total tax');
					// console.log(total, 'amount after tax');
					amountRemaining = amountRemaining - bucket.amount;
					// console.log(amountRemaining, 'remaining ');
				}
				//block of code that runs if bucket overflows
				if (amountRemaining >= bucketDiff) {
					const data = calcTax(bucketDiff, bucket.tax);
					total += data.amount;
					tax += data.tax;
					// console.log(tax, 'total tax');
					// console.log(total, 'amount after tax');

					amountRemaining = amountRemaining - bucketDiff;
					// console.log(amountRemaining);
				}
			}
		});
	}

	// console.log(tax, 'tax end of function');
	// console.log(total, 'post tax total end of function');
	// console.log(total + tax, income);
	return {
		tax,
		total,
	};
};

const calculateTax = (income, location) => {
	// console.log(income);
	const federalTax = taxDue(income, federal, 'federal');
	const provincialTax = taxDue(income, provincial[location], 'federal');
	// console.log('federal', federalTax);
	// console.log('provincial', provincialTax);
	const newTotal = provincialTax.total - federalTax.tax;
	const postDeduction = Math.round(newTotal * 100) / 100;
	const fedTax = Math.round(federalTax.tax * 100) / 100;
	// const provTax = provincialTax.tax;
	const provTax = Math.round(provincialTax.tax * 100) / 100;
	// console.log(postDeduction + fedTax + provTax);

	return {
		postDeduction,
		fedTax,
		provTax,
	};
};

module.exports = calculateTax;

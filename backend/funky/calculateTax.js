const federal = [
  { amount: 50197, tax: 1.15 },
  { amount: 100392, tax: 1.205 },
  { amount: 155625, tax: 1.26 },
  { amount: 221708, tax: 1.29 },
  { amount: 221708, tax: 1.33 },
];
const calcTax = (amount, tax) => {
  taxDiff = amount * tax;
  tax = taxDiff - amount;
  return {
    amount: amount - tax,
    tax,
  };
};

const federalDue = (income) => {
  let total = income; //value of total to retun
  let fedTax = 0; //tax data to retun
  let amountRemaining = income; // total changing through loop
  //if the user will only fill 1 bucket
  if (income <= federal[0].amount) {
    data = calcTax(income, federal[0].tax);
    total = data.amount;
    fedTax = data.tax;
  } else {
    //if user is making more than first bracket
    const fedBuckets = federal.forEach((bucket, index, ogArr) => {
      //IF CONDITION FOR FINAL LOOP
      if (index === 4 && income >= 221708) {
        const data = calcTax(amountRemaining, bucket.tax);
        console.log(total);
        console.log(fedTax);
        total += data.amount;
        fedTax += data.tax;
        console.log(amountRemaining, 'remaining amount on final loop');
        console.log(total + fedTax, income);
        return;
      }
      //IF CONDITION FOR FIRST LOOP
      if (index < 1) {
        amountRemaining -= bucket.amount;
        const data = calcTax(bucket.amount, bucket.tax);
        total = data.amount;
        fedTax = data.tax;
      } else {
        //ALL THE OTHER BUCKETS
        const bucketDiff = bucket.amount - ogArr[index - 1].amount;
        //block of code that runs if bucket does NOT overflow
        if (amountRemaining <= bucketDiff && amountRemaining > 0) {
          const data = calcTax(amountRemaining, bucket.tax);
          console.log(data);
          total += data.amount;
          fedTax += data.tax;
          console.log(fedTax, 'total tax');
          console.log(total, 'amount after tax');
          amountRemaining = amountRemaining - bucket.amount;
          console.log(amountRemaining, 'remaining ');
        }
        //block of code that runs if bucket overflows
        if (amountRemaining >= bucketDiff) {
          const data = calcTax(bucketDiff, bucket.tax);
          total += data.amount;
          fedTax += data.tax;
          console.log(fedTax, 'total tax');
          console.log(total, 'amount after tax');

          amountRemaining = amountRemaining - bucketDiff;
          console.log(amountRemaining);
        }
      }
    });
  }

  console.log(fedTax, 'tax end of function');
  console.log(total, 'post tax total end of function');
  console.log(total + fedTax, income);
};

const calculateTax = (income) => {
  // console.log(income);
  console.log(federalDue(260000));
  return 'data that i will return';
};

module.exports = calculateTax;

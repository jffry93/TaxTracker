const posMin = 0;
const posMax = 10;
const minDelay = 0.25;
const maxDelay = 4;
const minDuration = 7;
const maxDuration = 15;

const getShapes = (req, res) => {
	const circleArray = [
		{
			position:
				Math.floor(Math.random() * (posMax - posMin + 1) + posMin) * 10 + '%',
			size: '160px',
			animation: {
				delay: '0s',
				duration:
					Math.floor(
						Math.random() * (maxDuration - minDuration + 1) + minDuration
					) *
						1.2 +
					's',
			},
		},
		{
			position:
				Math.floor(Math.random() * (posMax - posMin + 1) + posMin) * 10 + '%',
			size: '80px',
			animation: {
				delay: '0.5s',
				duration:
					Math.floor(
						Math.random() * (maxDuration - minDuration + 1) + minDuration
					) *
						1.2 +
					's',
			},
		},
	];

	const buildArray = (array, size, amount) => {
		for (let i = 0; i < amount; i++) {
			array.push({
				position:
					Math.floor(Math.random() * (posMax - posMin + 1) + posMin) * 10 + '%',
				size,
				animation: {
					delay:
						Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay) *
							3 +
						's',
					duration:
						Math.floor(
							Math.random() * (maxDuration - minDuration + 1) + minDuration
						) *
							1.2 +
						's',
				},
			});
		}
	};

	buildArray(circleArray, '20px', 1);
	buildArray(circleArray, '30px', 2);
	buildArray(circleArray, '50px', 2);
	buildArray(circleArray, '120px', 1);
	buildArray(circleArray, '60px', 2);

	res.status(200).json({ status: 200, data: circleArray });
};

module.exports = {
	getShapes,
};

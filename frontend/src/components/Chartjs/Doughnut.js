import { useTransactionContext } from '../../hooks/useTransactionHook';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import getPercentage from '../../utils/getPercentage';
import { useStyleContext } from '../../hooks/useStyleHook';

const DoughnutChart = () => {
	ChartJS.register(ArcElement, Tooltip, Legend, Title);
	const { purchaseTotal, provTax, fedTax, postDeduction } =
		useTransactionContext();
	const { lightMode } = useStyleContext();
	console.log(lightMode);
	const text = lightMode ? '#012a4a' : '#eeeeee';
	const color1 = lightMode ? '#468faf' : '#AAAAAA';
	const color2 = lightMode ? '#61a5c2' : '#BBBBBB';
	const color3 = lightMode ? '#DDDDDD' : '#DDDDDD';
	const color4 = lightMode ? '#FFFFFF' : '#EEEEEE';

	const data = {
		labels: ['INCOME', 'PURCHASE', 'PROV TAX', 'FED TAX'],
		datasets: [
			{
				label: 'hello',
				data: [postDeduction, purchaseTotal, provTax, fedTax],
				backgroundColor: [color1, color2, color3, color4],
				borderColor: [color1 + 80, color2 + 90, color3, color4],
				borderWidth: 1,
			},
		],
	};

	const options = {
		elements: {
			arc: { backgroundColor: 'white' },
		},
		plugins: {
			// title: {
			// 	display: true,
			// 	text: "Indice d'impact global de la transaction",
			// 	align: 'center',
			// 	padding: {
			// 		top: 10,
			// 		// bottom: 30,
			// 	},
			// },
			tooltip: {
				xAlign: 'right',
				backgroundColor: 'purple',
				callbacks: {
					// label: function (context) {
					// 	return;
					// },
					label: function (context) {
						const {
							parsed,
							dataset: { data, label },
						} = context;

						return `amount: $${parsed}`;
					},
					afterLabel: function (context) {
						const {
							parsed,
							dataset: { data, label },
						} = context;
						const total = data.reduce(
							(accumulator, currentValue) => accumulator + currentValue,
							0
						);
						return `average: ${getPercentage(parsed, total)}`;
					},
					title: (context) => {
						const { label } = context[0];
						return label;
					},
				},
			},
			legend: {
				labels: {
					padding: 15,
					boxHeight: 20,
					boxWidth: 20,
					color: text,
					font: {
						size: 12,
					},
				},
				title: {
					display: true,
					text: 'LEGEND',
					color: text,
					font: {
						size: 18,
						weight: 'bold',
					},
				},
				display: true,
				position: 'left',
			},
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
	};

	return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;

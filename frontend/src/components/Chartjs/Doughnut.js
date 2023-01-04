import { useTransactionContext } from '../../hooks/useTransactionHook';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import getPercentage from '../../utils/getPercentage';
import { useStyleContext } from '../../hooks/useStyleHook';

const DoughnutChart = () => {
	ChartJS.register(ArcElement, Tooltip, Legend, Title);
	const { purchaseTotal, provTax, fedTax, postDeduction } =
		useTransactionContext();
	const { lightMode } = useStyleContext();

	const text = lightMode ? 'black' : 'black';
	const color1 = lightMode ? 'rgb(0 134 140)' : '#AAAAAA';
	const color2 = lightMode ? 'rgb(35 92 111)' : '#BBBBBB';
	const color3 = lightMode ? 'rgb(236 125 72)' : '#DDDDDD';
	const color4 = lightMode ? 'rgb(255 161 122)' : '#EEEEEE';

	const data = {
		labels: ['INCOME', 'PURCHASE', 'PROV TAX', 'FED TAX'],
		datasets: [
			{
				label: 'hello',
				data: [postDeduction, purchaseTotal, provTax, fedTax],
				backgroundColor: [color1, color2, color3, color4],
				borderColor: [
					'rgb(255 161 122)',
					'rgb(236 125 72)',
					'rgb(35 92 111)',
					'rgb(0 134 140)',
				],
				borderWidth: 1,
				hoverOffset: 4,
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
				// xAlign: 'right',
				titleColor: text,
				bodyColor: text,
				backgroundColor: 'rgb(241 237 255)',
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
				display: false,
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

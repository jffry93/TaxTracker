import { useTransactionContext } from '../../hooks/useTransactionHook';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import getPercentage from '../../utils/getPercentage';

ChartJS.register(Title);
// ChartJS.register(Tooltip);
// const tooltip = ChartJS.defaults.plugins.tooltip;
// tooltip.enabled = true;
// tooltip.backgroundColor = '#666';
// console.log(ChartJS.defaults.plugins.tooltip);

const DoughnutChart = () => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const { purchaseTotal, provTax, fedTax, postDeduction } =
		useTransactionContext();

	const data = {
		labels: ['INCOME', 'PURCHASE', 'PROV TAX', 'FED TAX'],
		datasets: [
			{
				label: 'hello',
				data: [postDeduction, purchaseTotal, provTax, fedTax],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'#075026',
					'#0a591b',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'#36eb60',
					'#0fc360',
				],
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
					color: 'green',
					font: {
						size: 12,
					},
				},
				title: {
					display: true,
					text: 'LEGEND',
					color: 'green',
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

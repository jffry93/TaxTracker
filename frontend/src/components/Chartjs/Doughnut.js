import { useTransactionContext } from '../../hooks/useTransactionHook';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { paymentTotal, purchaseTotal, provTax, fedTax, postDeduction } =
    useTransactionContext();

  const data = {
    // labels: ['Income', 'Purchases'],
    datasets: [
      {
        label: '# of Votes',
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

  return <Doughnut data={data} />;
};

export default DoughnutChart;

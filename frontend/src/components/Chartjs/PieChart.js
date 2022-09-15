import { useTransactionContext } from '../../hooks/useTransactionHook';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { paymentTotal, purchaseTotal } = useTransactionContext();
  const incomeMinusPurchases = paymentTotal - purchaseTotal;
  // console.log(incomeMinusPurchases);
  // console.log(purchaseTotal);

  const data = {
    labels: ['Income', 'Purchases'],
    datasets: [
      {
        label: '# of Votes',
        data: [incomeMinusPurchases, purchaseTotal],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;

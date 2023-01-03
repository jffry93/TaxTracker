import { useTransactionContext } from '../../../hooks/useTransactionHook';
import ChartContainer from '../../Chartjs/ChartContainer';
import StartTracking from '../Initial/StartTracking';

const InfoContainer = () => {
	const { transactions } = useTransactionContext();
	// console.log(transactions);
	return <>{transactions.length ? <ChartContainer /> : <StartTracking />}</>;
};

export default InfoContainer;

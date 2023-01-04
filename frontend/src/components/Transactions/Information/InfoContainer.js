import { useTransactionContext } from '../../../hooks/useTransactionHook';
import ChartContainer from '../../Chartjs/ChartContainer';
import StartTracking from '../Initial/StartTracking';

const InfoContainer = () => {
	const { truth } = useTransactionContext();
	// console.log(transactions);
	return <>{truth.length ? <ChartContainer /> : <StartTracking />}</>;
};

export default InfoContainer;

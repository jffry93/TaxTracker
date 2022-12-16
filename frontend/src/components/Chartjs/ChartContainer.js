import styled from 'styled-components';
import { useTransactionContext } from '../../hooks/useTransactionHook';
import ChartInfo from './ChartInfo';
import Danger from './Danger';
import DoughnutChart from './Doughnut';

const ChartContainer = () => {
	const { postDeduction } = useTransactionContext();

	return (
		<StyledData>
			<StyledContainer>
				<StyledMain>
					{postDeduction < 0 && <Danger />}
					<div className='chart'>
						<div className='container'>
							<strong>INCOME</strong>
							<h1>${Math.floor(postDeduction)}</h1>
						</div>
						<DoughnutChart />
					</div>
				</StyledMain>
				<ChartInfo />
			</StyledContainer>
		</StyledData>
	);
};

export default ChartContainer;

const StyledData = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	min-height: 100vh;
	padding-bottom: 56px;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
`;

const StyledContainer = styled.div`
	/* border: 1px solid green; */
`;

const StyledMain = styled.div`
	width: 100%;
	padding: 0px 0px 16px;
	.chart {
		margin: auto;
		width: 320px;
		height: 250px;
		position: relative;
		.container {
			width: 50px;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: absolute;
			top: 60%;
			left: 66%;
			transform: translate(-50%, -50%);
			strong {
				margin-left: 16px;
				font-size: 20px;
			}
			h1 {
				font-size: 40px;
			}
		}
	}
`;

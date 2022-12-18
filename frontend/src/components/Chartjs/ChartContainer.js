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
							<h1>INCOME</h1>
							<h2>${Math.floor(postDeduction)}</h2>
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
	width: 100%;
	max-width: 1200px;
	padding: 0 32px 56px;
	margin: 0 auto;
`;

const StyledContainer = styled.div`
	width: 100%;
`;

const StyledMain = styled.div`
	width: 100%;
	padding: 24px 0px 16px;
	.chart {
		margin: auto;
		width: 100%;

		.container {
			width: 50px;
			display: flex;
			flex-direction: column;
			align-items: center;
			/* text-align: ; */
			/* 
			position: absolute;
			top: 45%;
			left: 47%;
			transform: translate(-50%, -50%); */
			/* border: 1px solid red; */
			strong {
				margin-left: 16px;
				font-size: 24px;
			}
			h1 {
				font-size: 40px;
				/* width: 100%; */
				/* border: 1px solid red; */
			}
			h2 {
				font-size: 32px;
				margin: 8px 0 16px;
			}
		}
	}
`;

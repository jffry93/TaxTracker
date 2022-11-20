import { useEffect } from 'react';
import styled from 'styled-components';

const Settings = () => {
	const circleArray = [];
	const posMin = 0;
	const posMax = 10;
	const minDelay = 0.25;
	const maxDelay = 4;
	const minDuration = 8;
	const maxDuration = 12;

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

	buildArray(circleArray, '20px', 2);
	buildArray(circleArray, '30px', 3);
	buildArray(circleArray, '50px', 2);
	buildArray(circleArray, '120px', 1);
	buildArray(circleArray, '160px', 1);
	buildArray(circleArray, '60px', 3);

	const circleData = [...circleArray];
	console.log(circleData);
	return (
		<StyledDiv>
			<div className='context'>
				<h2>Settings</h2>
			</div>

			<StyledArea>
				<ul class='circles'>
					{circleData.map((circle) => {
						console.log(circle);
						const { position, size, animation } = circle;
						return (
							<StyledCircle
								size={size}
								position={position}
								animation={animation}
							></StyledCircle>
						);
					})}
				</ul>
			</StyledArea>
		</StyledDiv>
	);
};

export default Settings;
const StyledArea = styled.div`
	background: #4e54c8;
	background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
	width: 100%;
	min-height: 100vh;

	.circles {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.circles li {
		position: absolute;
		display: block;
		list-style: none;
	}

	@keyframes animate {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 1;
			border-radius: 5%;
		}

		70% {
			opacity: 0;
			border-radius: 25%;
		}

		100% {
			transform: translateY(-1000px) rotate(720deg);
			border-radius: 0%;
			opacity: 0;
		}
	}
`;

const StyledCircle = styled.li`
	position: absolute;
	left: ${(props) => props.position};
	display: block;
	list-style: none;
	width: ${(props) => props.size};
	height: ${(props) => props.size};
	background: rgba(255, 255, 255, 0.2);
	animation-delay: ${(props) => props.animation.delay};
	animation: animate
		${(props) =>
			`${props.animation.duration} linear ${props.animation.delay}  infinite`};
	bottom: -150px;
`;

const StyledDiv = styled.div`
	/* border: 1px solid red; */
	min-height: 100vh;
	width: 100%;

	.context {
		width: 100%;
		position: absolute;
		text-align: center;
		top: 50vh;
	}

	.context h1 {
		text-align: center;
		color: #fff;
		font-size: 50px;
	}
`;

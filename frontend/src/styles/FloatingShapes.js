import uuid from 'react-uuid';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const FloatingShapes = () => {
	const [shapeData, setShapeData] = useState(null);
	useEffect(() => {
		const fetchCircles = async () => {
			const res = await fetch('./api/styles/');
			const json = await res.json();
			setShapeData(json.data);
		};
		fetchCircles();
	}, []);
	return (
		<>
			{shapeData && (
				<StyledArea>
					<ul className='circles'>
						{shapeData.map((circle, i) => {
							const { position, size, animation } = circle;
							return (
								<StyledCircle
									key={circle.size + i}
									size={size}
									position={position}
									animation={animation}
								></StyledCircle>
							);
						})}
					</ul>
				</StyledArea>
			)}
		</>
	);
};

export default FloatingShapes;

const StyledArea = styled.div`
	position: fixed;
	top: 0;
	z-index: -1;
	/* border: 1px solid red; */
	background-color: rgba(0, 0, 0, 0.1);
	background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
	width: 100%;
	height: 100vh;
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
			transform: translateY(0px) rotate(0deg);
			opacity: 1;
			border-radius: 50%;
		}

		70% {
			opacity: 0;
			border-radius: 35%;
		}

		100% {
			transform: translateY(-1000px) rotate(720deg);
			border-radius: 50%;
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
	background: rgba(255, 255, 255, 0.25);
	animation-delay: ${(props) => props.animation.delay};
	animation: animate
		${(props) =>
			`${props.animation.duration} linear ${props.animation.delay}  infinite`};
	bottom: -150px;
`;

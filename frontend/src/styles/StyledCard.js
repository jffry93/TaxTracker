import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledCard = styled(motion.div)`
	position: relative;
	overflow: hidden;
	background-color: var(--primary);
	padding: 16px 24px;
	width: ${(props) => {
		if (!props.open) {
			return 'clamp(220px, 45vw, 250px)';
		} else {
			return `clamp(320px, 60vw, 370px)`;
		}
	}};
	box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
		rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
		rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
	img {
		width: 150px;
	}
	img {
		width: 100%;
	}
	.more {
		margin-top: 8px;
		text-align: center;
	}
`;
export const StyledUpper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	/* gap: 12px; */
	position: relative;
`;
export const StyledLower = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	margin-top: 16px;
`;

export const StyledMoreAction = styled(motion.p)``;

export const StyledTitleContainer = styled(motion.div)`
	width: 100%;
`;
export const StyledTitle = styled.p`
	margin-bottom: 8px;
	font-size: 20px;
	font-weight: bold;
	text-align: ${(props) => (props.open ? 'left' : 'center')};
`;

export const StyledButtonContainer = styled.div`
	display: flex;
	gap: 8px;
	button {
		flex: 1;
	}
`;

export const StyledActionDiv = styled(motion.div)`
	/* position: absolute; */
	right: 0;
	background-color: var(--vivid-pink);
	border-radius: 50%;
	.confirm-container {
		height: 35px;
		display: flex;
		align-items: center;
		padding: 0px 8px;
	}

	.garbage-container {
		height: 35px;
		width: 35px;
		/* border-radius: 50%; */

		cursor: pointer;

		position: relative;
		svg {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
`;

export const StyledContent = styled.div`
	position: relative;
	z-index: 1;
`;

//UPDATE CARD INFORMATION

export const StyledTop = styled.div`
	display: flex;
	gap: 8px;
	.client-input {
		width: 100%;
	}
	.amount-input {
		width: 100px;
	}
`;
export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 16px 0 0 0;
	width: 100%;
`;

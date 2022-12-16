import styled from 'styled-components';

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;

	width: 100%;
	.zoom-div {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		min-height: 220px;
		img {
			width: 200px;
			border-radius: 50%;
			max-width: 200px;
		}
	}
`;

export const StyledSpan = styled.span`
	opacity: ${(props) => {
		return props.updateActive === true ? '0' : '1';
	}};
`;

export const StyledButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;

	width: 100%;
	margin-top: 16px;
	button {
		font-size: 24px;
	}
`;

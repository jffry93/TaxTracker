import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  /* gap: 8px; */
  width: 100%;
  &:first-child {
    margin-top: 100px;
  }
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
  display: ${(props) => {
    return props.updateActive !== true ? 'block' : 'none';
  }};
  font-size: 18px;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 16px;
  padding-bottom: 32px;
  button {
    font-size: 20px;
    padding: 12px 16px;
  }
`;

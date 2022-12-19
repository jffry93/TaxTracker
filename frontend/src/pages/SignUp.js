import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';

const SignUp = () => {
  const { loginWithRedirect } = useAuth0();

  const debounceLogin = useDebounce(() => {
    loginWithRedirect();
  });
  return (
    <StyledContainer>
      <StyledContext>
        <div>
          <StyledTitle>
            TAX <br />
            TRACKER
          </StyledTitle>
          <h1>
            Click below <br />
            for instant <br /> access
          </h1>
        </div>
        <button onClick={debounceLogin}>SIGN UP</button>
      </StyledContext>
    </StyledContainer>
  );
};

export default SignUp;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 64px 32px;
`;
const StyledContext = styled.div`
  height: 100%;
  min-width: 336px;
  max-height: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    margin-top: 36px;
    font-size: 20px;
    padding: 12px 16px;
    width: 100%;
    max-width: 336px;
  }
`;

const StyledTitle = styled.h1`
  font-size: clamp(3.125rem, 20vw, 60px);
  margin-bottom: 32px;
`;

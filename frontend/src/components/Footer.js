import styled from 'styled-components';
import React from 'react';

const Footer = () => {
  return (
    <StyledFooter>
      <p>Built by &copy; Jeff Z</p>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;

  padding: 16px;
  font-size: 16px;

  background-color: var(--primary);
  color: var(--off-white);
`;

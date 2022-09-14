import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
//COMPONENTS
import Login from './Auth0/Login';
import Logout from './Auth0/Logout';

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <StyledHeader>
      <div className='container'>
        <Link to='/'>
          <h3>Tax Tracker</h3>
        </Link>
      </div>
      <div>{!user ? <Login /> : <Logout />}</div>
    </StyledHeader>
  );
};

export default Navbar;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;

  display: flex;

  height: 60px;
  background-color: var(--primary);

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    a {
      color: var(--off-white);
    }
    p {
      font-size: 16px;
    }
  }
`;

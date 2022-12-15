import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

//COMPONENTS
import Login from '../Auth0/Login';
import Logout from '../Auth0/Logout';
import { useRef } from 'react';

const DesktopNav = () => {
	const { user } = useAuth0();

	const ref = useRef(null);

	return (
		<StyledDesktopNav>
			<div ref={ref} className='container'>
				<Link to='/'>
					<h3>Tax Tracker</h3>
				</Link>
				<div>{!user ? <Login /> : <Logout />}</div>
			</div>
		</StyledDesktopNav>
	);
};

export default DesktopNav;

const StyledDesktopNav = styled.header`
	position: relative;
	top: 0;
	z-index: 1;
	width: 100%;
	background-color: var(--primary);
	display: flex;

	.container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		/* border: 1px solid red; */
		a {
			color: var(--off-white);
		}
		p {
			font-size: 16px;
		}
	}
`;

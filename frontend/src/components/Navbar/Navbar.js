import { useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useStyleContext } from '../../hooks/useStyleHook';
import DesktopNav from './DesktopNav';
import MobileNav from '../Navbar/Mobile/MobileNav';

const Navbar = () => {
	const { dispatch, viewWidth, mobileBreakpoint } = useStyleContext();

	const handleDebounce = useDebounce(() => handleResizeWindow(), 100);

	const handleResizeWindow = () => {
		dispatch({ type: 'SET_VIEW_WIDTH', width: window.innerWidth });
	};
	useEffect(() => {
		// subscribe to window resize event "onComponentDidMount"
		window.addEventListener('resize', handleDebounce);
		return () => {
			// unsubscribe "onComponentDestroy"
			window.removeEventListener('resize', handleResizeWindow);
		};
	}, []);

	return (
		<>
			{/* {viewWidth > mobileBreakpoint ? <DesktopNav /> : <MobileNav />} */}
			<MobileNav />
		</>
	);
};

export default Navbar;

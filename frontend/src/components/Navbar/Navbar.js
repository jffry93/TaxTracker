import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useStyleContext } from '../../hooks/useStyleHook';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
  const { dispatch, viewWidth, mobileBreakpoint } = useStyleContext();

  const handleFunc = useDebounce(() => handleResizeWindow(), 100);

  const handleResizeWindow = () =>
    dispatch({ type: 'SET_VIEW_WIDTH', width: window.innerWidth });
  useEffect(() => {
    // subscribe to window resize event "onComponentDidMount"
    // handleDebounce();
    window.addEventListener('resize', handleFunc);

    // window.addEventListener('resize', handleResizeWindow);

    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return <>{viewWidth > mobileBreakpoint ? <DesktopNav /> : <MobileNav />}</>;
};

export default Navbar;
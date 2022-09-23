import { useState, useEffect } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import TemporaryDrawer from './TemporaryDrawer';

const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 640;

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    // subscribe to window resize event "onComponentDidMount"
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      // unsubscribe "onComponentDestroy"
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return <>{width > breakpoint ? <DesktopNav /> : <MobileNav />}</>;
};

export default Navbar;

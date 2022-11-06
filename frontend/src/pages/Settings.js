import { useContext } from 'react';
import { DemoContext } from '../context/DemoContext';
import useDebounce, { helloFunc, byeFunc } from '../hooks/useDebounce';

const Settings = () => {
	const obj = useContext(DemoContext);
	// console.log(obj);
	console.log('settings');
	return <div>Settings</div>;
};

export default Settings;

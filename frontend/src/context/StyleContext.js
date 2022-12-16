import { useState } from 'react';
import { createContext, useReducer } from 'react';

export const StyleContext = createContext();

const initialState = {
	viewWidth: window.innerWidth,
	mobileBreakpoint: 640,
};

export const widthReducer = (state, action) => {
	switch (action.type) {
		//width
		case 'SET_VIEW_WIDTH':
			return {
				...state,
				viewWidth: action.width,
			};
		default:
			return state;
	}
};

export const StyleContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(widthReducer, initialState);
	const [lightMode, setLightMode] = useState(false);
	const [dangerZone, setDangerZone] = useState(false);

	return (
		<StyleContext.Provider
			value={{
				...state,
				dispatch,
				lightMode,
				setLightMode,
				dangerZone,
				setDangerZone,
			}}
		>
			{children}
		</StyleContext.Provider>
	);
};

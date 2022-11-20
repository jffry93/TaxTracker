import { createContext, useEffect, useReducer } from 'react';

export const UserContext = createContext();

const reducerFunction = (state, action) => {
	switch (action.type) {
		case 'LOG_ON':
			return {
				...state,
				userStatus: 'active',
				userInfo: { ...state.user, ...action.user },
				legitCheck: true,
			};
		case 'FAILED':
			return {
				...state,
				userStatus: 'failed',
				// legitCheck: false,
			};
		case 'UPDATE_USER':
			return {
				...state,
				userInfo: { ...state.user, ...action.user },
			};
		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const initialState = {
		userStatus: 'idle',
		userInfo: {},
		legitCheck: false,
	};
	const [state, userDispatch] = useReducer(reducerFunction, initialState);

	return (
		<UserContext.Provider value={{ ...state, userDispatch }}>
			{children}
		</UserContext.Provider>
	);
};

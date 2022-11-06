import { createContext, useReducer, useState } from 'react';

export const DemoContext = createContext();

const initialState = {
	string: 'initial state',
	number: 420,
};

const reducerFunction = (state, action) => {
	switch (action.type) {
		case 'CHANGE_STRING':
			return {
				...state,
				string: action.string,
			};
		default:
			return state;
	}
};

export const DemoProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducerFunction, initialState);
	const handleAction = () => {
		console.log('hello from context');
	};
	return (
		<DemoContext.Provider
			value={{ state, dispatch, funkyTown: { handleAction } }}
		>
			{children}
		</DemoContext.Provider>
	);
};

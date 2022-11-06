import { createContext, useReducer } from 'react';

export const StateContext = createContext();

const initialValue = {
	name: 'Jeff',
	age: 29,
	location: 'Toronto',
}; //declare initial value. ALWAYS an object

const reducerFunction = (state, action) => {
	//logic to change state
	//           (current state values, new state values)
	switch (action.type) {
		case 'BIRTHDAY':
			let x = state.age + 1; //change data inside switch
			return {
				...state,
				age: x,
			};
		case 'MOVED': //dynamic action key
			return {
				...state,
				location: action.location,
				weather: action.weather,
				//action.location = location: 'data' in component on dispatch()
			};
		default:
			return state;
	}
};

export const StateProvider = ({ children }) => {
	//set up useReducer inside context provider line 11
	const [state, dispatch] = useReducer(reducerFunction, initialValue);
	//   [access state, change state]     (change logic, initial state)
	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
};

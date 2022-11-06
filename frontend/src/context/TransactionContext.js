import { createContext, useReducer } from 'react';

export const TransactionContext = createContext();

const initialState = {
	filterType: 'all',
	transactions: null,
	paymentTotal: null,
	purchaseTotal: null,
	provTax: null,
	fedTax: null,
	postDeduction: null,
	test: 'string',
};

export const transactionsReducer = (state, action) => {
	switch (action.type) {
		//TRANSACTIONS
		case 'SET_TRANSACTIONS':
			return {
				...state,
				truth: action.transactions,
				transactions: action.transactions,
				paymentTotal: action.paymentTotal,
				purchaseTotal: action.purchaseTotal,
				provTax: action.provTax,
				fedTax: action.fedTax,
				postDeduction: action.postDeduction,
			};
		case 'CREATE_TRANSACTIONS':
			return {
				...state,
				truth: [action.payload, ...state.truth],
				transactions: [action.payload, ...state.transactions],
				paymentTotal: action.paymentTotal,
				purchaseTotal: action.purchaseTotal,
				provTax: action.provTax,
				fedTax: action.fedTax,
				postDeduction: action.postDeduction,
			};
		case 'DELETE_TRANSACTIONS':
			return {
				...state,
				truth: state.truth.filter(
					(transactions) => transactions._id !== action.payload._id
				),
				transactions: state.transactions.filter(
					(transactions) => transactions._id !== action.payload._id
				),
				paymentTotal: action.paymentTotal,
				purchaseTotal: action.purchaseTotal,
				provTax: action.provTax,
				fedTax: action.fedTax,
				postDeduction: action.postDeduction,
			};
		case 'FILTER_PURCHASES':
			return {
				...state,
				filterType: action.payload,
				transactions: state.truth.filter((transactions) => {
					if (action.payload === 'all') {
						return transactions;
					} else {
						return (
							transactions.type.toLowerCase() === action.payload.toLowerCase()
						);
					}
				}),
			};
		case 'TEST':
			return {
				...state,
				test: 'test',
			};
		default:
			return state;
	}
};

export const TransactionsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(transactionsReducer, initialState);

	return (
		<TransactionContext.Provider value={{ ...state, dispatch }}>
			{children}
		</TransactionContext.Provider>
	);
};

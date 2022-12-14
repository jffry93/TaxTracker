import { createContext, useReducer, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const TransactionContext = createContext();

const initialState = {
	filterType: 'all',
	sortType: 'recent',
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
		case 'UPDATE_TRANSACTIONS':
			const filterArray = action.payload.filter((transaction) => {
				if (action.filter === 'all') {
					return transaction;
				} else {
					return transaction.type.toLowerCase() === action.filter.toLowerCase();
				}
			});
			const sortArray = filterArray.sort((a, b) => {
				if (action.sort === 'recent') {
					return new Date(b.createdAt) - new Date(a.createdAt);
				}
				if (action.sort === 'oldest') {
					return new Date(a.createdAt) - new Date(b.createdAt);
				}
				if (action.sort === 'low-to-high') {
					return a.amount - b.amount;
				}
				// Turn your strings into dates, and then subtract them
				// to get a value that is either negative, positive, or zero.
				if (action.sort === 'high-to-low') {
					return b.amount - a.amount;
				}
				// return new Date(b.date) - new Date(a.date);
			});
			return {
				...state,
				truth: [...action.payload],
				// transactions: [action.payload, ...state.transactions],
				paymentTotal: action.paymentTotal,
				purchaseTotal: action.purchaseTotal,
				provTax: action.provTax,
				fedTax: action.fedTax,
				postDeduction: action.postDeduction,
				transactions: sortArray,
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
		case 'FILTER_TRANSACTIONS':
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
		case 'SORT_TRANSACTIONS':
			return {
				...state,
				sortType: action.payload,
				transactions: state.transactions.sort((a, b) => {
					console.log(a);
					if (action.payload === 'recent') {
						return new Date(b.createdAt) - new Date(a.createdAt);
					}
					if (action.payload === 'oldest') {
						return new Date(a.createdAt) - new Date(b.createdAt);
					}
					if (action.payload === 'low-to-high') {
						return a.amount - b.amount;
					}
					// Turn your strings into dates, and then subtract them
					// to get a value that is either negative, positive, or zero.
					if (action.payload === 'high-to-low') {
						return b.amount - a.amount;
					}
					// return new Date(b.date) - new Date(a.date);
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
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [state, dispatch] = useReducer(transactionsReducer, initialState);

	return (
		<TransactionContext.Provider value={{ ...state, dispatch }}>
			{children}
		</TransactionContext.Provider>
	);
};

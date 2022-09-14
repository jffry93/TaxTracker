import { createContext, useReducer } from 'react';

export const TransactionContext = createContext();

const initialState = {
  transactions: null,
  paymentTotal: null,
  purchaseTotal: null,
};

export const transactionsReducer = (state, action) => {
  switch (action.type) {
    //TRANSACTIONS
    case 'SET_TRANSACTIONS':
      return {
        transactions: action.transactions,
        paymentTotal: action.paymentTotal,
        purchaseTotal: action.purchaseTotal,
      };
    case 'CREATE_TRANSACTIONS':
      return {
        transactions: [action.payload, ...state.transactions],
      };
    case 'DELETE_TRANSACTIONS':
      return {
        transactions: state.transactions.filter(
          (transactions) => transactions._id !== action.payload._id
        ),
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

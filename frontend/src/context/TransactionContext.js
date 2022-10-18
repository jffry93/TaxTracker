import { createContext, useReducer } from 'react';

export const TransactionContext = createContext();

const initialState = {
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
        transactions: state.transactions.filter(
          (transactions) => transactions._id !== action.payload._id
        ),
        paymentTotal: action.paymentTotal,
        purchaseTotal: action.purchaseTotal,
        provTax: action.provTax,
        fedTax: action.fedTax,
        postDeduction: action.postDeduction,
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

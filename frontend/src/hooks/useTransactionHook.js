import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw Error(
      'useTransactionContext must be used inside a TransactionContextProvider'
    );
  }

  return context;
};

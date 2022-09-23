import { useContext } from 'react';
import { StyleContext } from '../context/StyleContext';

export const useStyleContext = () => {
  const context = useContext(StyleContext);

  if (!context) {
    throw Error('useStyleContext must be used inside a useStyleContext');
  }

  return context;
};

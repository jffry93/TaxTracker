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
        ...initialState,
        viewWidth: action.width,
      };
    default:
      return state;
  }
};

export const StyleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(widthReducer, initialState);

  return (
    <StyleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StyleContext.Provider>
  );
};

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { TransactionsContextProvider } from './context/TransactionContext';
import GlobalStyle from './GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENTID}
    redirectUri={window.location.origin}
  >
    <TransactionsContextProvider>
      <GlobalStyle />
      <App />
    </TransactionsContextProvider>
  </Auth0Provider>
  // </React.StrictMode>
);

// setInterval(tickTock, 1000);
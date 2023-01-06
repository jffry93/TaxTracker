import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/styles/index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { TransactionsContextProvider } from './context/TransactionContext';
import { StyleContextProvider } from './context/StyleContext';
import { UserProvider } from './context/UserContext';

import WavyAnim from './pages/WavyAnim';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
	<Auth0Provider
		domain={process.env.REACT_APP_AUTH0_DOMAIN}
		clientId={process.env.REACT_APP_AUTH0_CLIENTID}
		redirectUri={window.location.origin}
	>
		<StyleContextProvider>
			<TransactionsContextProvider>
				<UserProvider>
					<App />
					<WavyAnim />
				</UserProvider>
			</TransactionsContextProvider>
		</StyleContextProvider>
	</Auth0Provider>
	// </React.StrictMode>
);

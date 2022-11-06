import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { TransactionsContextProvider } from './context/TransactionContext';
import GlobalStyle from './GlobalStyles';
import { StyleContextProvider } from './context/StyleContext';
import { StateProvider } from './context/StateContext';
import { DemoProvider } from './context/DemoContext';

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
				<StateProvider>
					<DemoProvider>
						<GlobalStyle />
						<App />
					</DemoProvider>
				</StateProvider>
			</TransactionsContextProvider>
		</StyleContextProvider>
	</Auth0Provider>
	// </React.StrictMode>
);

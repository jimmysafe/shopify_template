import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '../store';
import Cart from '../components/Cart';

const client = new ApolloClient({
	uri: process.env.STOREFRONT_URL,
	cache: new InMemoryCache(),
	headers: {
		'X-Shopify-Storefront-Access-Token': process.env.STOREFRONT_ACCESS_TOKEN,
		Accept: 'application/json',
	},
});

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Cart />
				<Component {...pageProps} />
			</Provider>
		</ApolloProvider>
	);
};

export default App;

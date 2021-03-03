import '../styles/compiled.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { NextPage } from 'next';
import { Provider } from 'react-redux';
import { store } from '../store';
import Layout from '../components/layout/Layout';

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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</ApolloProvider>
	);
};

export default App;

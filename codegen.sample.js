module.exports = {
	schema: [
		{
			'<STOREFRONT_GRAPHQL_URL_HERE>': {
				headers: {
					'X-Shopify-Storefront-Access-Token': '<STOREFRONT_GRAPHQL_ACCESS_TOKEN_HERE>',
					Accept: 'application/json',
				},
			},
		},
	],
	documents: ['./**/*.gql'],
	overwrite: true,
	generates: {
		'./graphql/generated.tsx': {
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
			config: {
				skipTypename: false,
				withHooks: true,
				withHOC: false,
				withComponent: false,
				withMutationFn: true,
				reactApolloVersion: 3,
			},
		},
	},
};

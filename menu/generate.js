const fs = require('fs');
const axios = require('axios');

const query = `
{
    collections(first:50){
      edges{
        node{
          title
          handle
          products(first:250){
            edges{
              node{
                productType
              }
            }
          }
        }
      }
    }
  }
`;

axios({
	url: 'https://jimmytest123.myshopify.com/api/2021-01/graphql.json',
	method: 'post',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/graphql',
		'X-Shopify-Storefront-Access-Token': '6a6321de6c26bca482ed9db72e988a24',
	},
	data: query,
})
	.then((res) => {
		const collections = res.data.data.collections.edges;

		const menu = collections.map((collection) => {
			const items = collection.node.products.edges.map((prod) => {
				return prod.node.productType;
			});

			return {
				title: collection.node.title,
				handle: collection.node.handle,
				items: [...new Set(items)],
			};
		});

		const data = JSON.stringify(menu, null, 2);

		fs.writeFile('./menu/menu.json', data, (err) => {
			if (err) throw err;
			console.log('Store Menu Successfully Generated..');
		});
	})
	.catch((err) => console.log(err.response));

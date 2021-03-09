import { FC } from 'react';
import type { CardProps } from '../product/ProductCard';
import ProductList from '../product/ProductList';
import { useCollectionQuery } from '../../graphql/generated';

type CollectionProps = {
	collection: string;
};

const CollectionList: FC<CollectionProps> = ({ collection }) => {
	const { loading, error, data } = useCollectionQuery({ variables: { handle: collection } });

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error...</p>;

	const productsData: CardProps[] = data.collectionByHandle.products.edges.map((product) => {
		return {
			title: product.node.title,
			handle: product.node.handle,
			image: product.node.images.edges[0].node.originalSrc,
			price: product.node.priceRange,
		};
	});
	return <ProductList productsData={productsData} />;
};

export default CollectionList;

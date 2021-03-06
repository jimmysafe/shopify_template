import { GetServerSideProps, NextPage } from 'next';
import type { CardProps } from '../../components/product/ProductCard';
import ProductList from '../../components/product/ProductList';
import { useCollectionQuery } from '../../graphql/generated';

type CollectionPageProps = {
	collection: string;
};

const CollectionPage: NextPage<CollectionPageProps> = ({ collection }) => {
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

	return (
		<div>
			<h1 className='font-primary font-semibold text-2xl text-center my-4'>
				{collection.charAt(0).toUpperCase() + collection.slice(1)}
			</h1>
			<ProductList productsData={productsData} />
		</div>
	);
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			collection: params.collection,
		},
	};
};

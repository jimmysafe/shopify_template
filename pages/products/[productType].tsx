import { GetServerSideProps, NextPage } from 'next';
import type { CardProps } from '../../components/product/ProductCard';
import ProductList from '../../components/product/ProductList';
import { useProductsByTypeQuery } from '../../graphql/generated';

type Props = {
	productType: string;
};

const ProductsByTypePage: NextPage<Props> = ({ productType }) => {
	const { loading, error, data } = useProductsByTypeQuery({
		variables: { query: `product_type:${productType}` },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error..</p>;

	const productsData: CardProps[] = data.products.edges.map((product) => {
		return {
			title: product.node.title,
			handle: product.node.handle,
			image: product.node.images.edges[0].node.originalSrc,
			price: product.node.priceRange,
		};
	});

	return (
		<div>
			<h1 className='font-primary font-semibold text-2xl text-center my-4'>{productType}</h1>
			<ProductList productsData={productsData} />
		</div>
	);
};

export default ProductsByTypePage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			productType: params.productType,
		},
	};
};

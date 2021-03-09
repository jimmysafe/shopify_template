import { FC } from 'react';
import type { CardProps } from '../../components/product/ProductCard';
import ProductList from '../../components/product/ProductList';
import { useProductsByTypeQuery } from '../../graphql/generated';
import Loading from '../layout/Loading';

type Props = {
	productType: string | string[];
};

const FilteredList: FC<Props> = ({ productType }) => {
	const { loading, error, data } = useProductsByTypeQuery({
		variables: { query: `product_type:${productType}` },
	});

	if (loading) return <Loading />;
	if (error) return <p>Error..</p>;

	const productsData: CardProps[] = data.products.edges.map((product) => {
		return {
			title: product.node.title,
			handle: product.node.handle,
			image: product.node.images.edges[0].node.originalSrc,
			price: product.node.priceRange,
		};
	});

	return <ProductList productsData={productsData} />;
};

export default FilteredList;

import { FC } from 'react';
import { ProductsByTypeQuery } from '../../graphql/generated';
import ProductCard from './ProductCard';

type ListProps = {
	productsData: ProductsByTypeQuery;
};

const ProductList: FC<ListProps> = ({ productsData }) => {
	const products = productsData.products.edges;
	return (
		<div className='flex flex-wrap'>
			{products.map((product) => (
				<ProductCard
					key={product.node.id}
					title={product.node.title}
					price={product.node.priceRange}
					handle={product.node.handle}
					image={product.node.images.edges[0].node.originalSrc}
				/>
			))}
		</div>
	);
};

export default ProductList;

import { FC } from 'react';
import ProductCard from './ProductCard';
import type { CardProps } from './ProductCard';

type ListProps = {
	productsData: CardProps[];
};

const ProductList: FC<ListProps> = ({ productsData }) => {
	return (
		<div className='flex flex-wrap'>
			{productsData.map((product) => (
				<ProductCard
					key={product.handle}
					title={product.title}
					price={product.price}
					handle={product.handle}
					image={product.image}
				/>
			))}
		</div>
	);
};

export default ProductList;

import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';
import { ProductPriceRange } from '../../graphql/generated';
import { Currency } from '../../utils/currency';
import { Price } from '../../utils/price';

export type CardProps = {
	title: string;
	handle: string;
	price: ProductPriceRange;
	image: string;
};

const ProductCard: FC<CardProps> = ({ title, handle, price, image }) => {
	const router = useRouter();
	return (
		<div
			className='p-4 text-center font-primary w-1/2'
			onClick={() => router.push(`/product/${handle}`)}
		>
			<div className='w-full border border-primary-light shadow-md'>
				<img src={image} alt={title} className='w-full' />
			</div>
			<p className='text-typo-dark mt-2'>{title}</p>
			<p className='text-sm font-semibold'>
				{Currency(price.minVariantPrice.currencyCode)}
				{Price(price.minVariantPrice.amount)}
			</p>
		</div>
	);
};

export default ProductCard;

import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';
import { ProductPriceRange } from '../../graphql/generated';

type CardProps = {
	title: string;
	handle: string;
	price: ProductPriceRange;
	image: string;
};

const ProductCard: FC<CardProps> = ({ title, handle, price, image }) => {
	const router = useRouter();
	return (
		<div
			className='flex-1 m-4 text-center font-primary'
			onClick={() => router.push(`/product/${handle}`)}
		>
			<div className='w-full border border-primary-light shadow-md'>
				<img src={image} alt={title} className='w-full' />
			</div>
			<p className='text-typo-dark mt-2'>{title}</p>
			<p className='text-sm font-semibold'>
				{price.minVariantPrice.currencyCode} {price.minVariantPrice.amount}
			</p>
		</div>
	);
};

export default ProductCard;
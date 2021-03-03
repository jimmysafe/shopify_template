import { NextPage } from 'next';
import { useState, useRef } from 'react';
import { GetServerSideProps } from 'next';
import { useProductByHandleQuery } from '../../graphql/generated';
import { addToCart as add } from '../../store/cartReducer';
import { useDispatch, useSelector } from '../../store';

type ProductPageProps = {
	handle: string;
};

type CartItem = {
	variantId: string;
	title: string;
	image: string;
	quantity?: number;
	currency: string;
	price: number;
};

const ProductPage: NextPage<ProductPageProps> = ({ handle }) => {
	const { loading, error, data } = useProductByHandleQuery({ variables: { handle } });

	const [selectedVariant, setSelectedVariant] = useState<CartItem>(null);

	const quantity = useRef<HTMLInputElement>();

	const cart = useSelector((state) => state.items);
	const dispatch = useDispatch();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error..</p>;

	const { variants, images, priceRange, title } = data.productByHandle;

	const selectVariant = (
		variantId: string,
		variantTitle: string,
		variantImage: string,
		price: number,
		currency: string
	) => {
		setSelectedVariant({
			variantId,
			title: `${title} - ${variantTitle}`,
			image: variantImage,
			price,
			currency,
		});
	};

	const addToCart = () => {
		const newItem: CartItem = {
			quantity: Number(quantity.current.value),
			variantId: selectedVariant.variantId,
			image: selectedVariant.image,
			title: selectedVariant.title,
			price: selectedVariant.price,
			currency: selectedVariant.currency,
		};

		dispatch(add(newItem));
	};

	return (
		<main>
			<h1>{title}</h1>
			<section className='images'>
				{images.edges.map((img, i) => (
					<img key={i} src={img.node.originalSrc} alt={img.node.altText} width='100px' />
				))}
			</section>
			<section className='price-range'>
				{!selectedVariant ? (
					<span>{`${priceRange.minVariantPrice.currencyCode} ${priceRange.minVariantPrice.amount} - ${priceRange.maxVariantPrice.currencyCode} ${priceRange.maxVariantPrice.amount}`}</span>
				) : (
					<span>{`${selectedVariant.currency} ${selectedVariant.price}`}</span>
				)}
			</section>
			<section className='variants'>
				{variants.edges.map((variant) => {
					return (
						<div
							key={variant.node.id}
							onClick={() =>
								selectVariant(
									variant.node.id,
									variant.node.title,
									variant.node.image.originalSrc,
									Number(variant.node.priceV2.amount),
									variant.node.priceV2.currencyCode
								)
							}
						>
							{variant.node.title}
						</div>
					);
				})}
			</section>
			<section className='quantity'>
				<input ref={quantity} type='number' defaultValue={1} />
			</section>
			<button onClick={addToCart} disabled={!selectedVariant}>
				Add to Cart
			</button>
		</main>
	);
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			handle: params.productHandle,
		},
	};
};

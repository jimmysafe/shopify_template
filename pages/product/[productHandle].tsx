import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useProductByHandleQuery } from '../../graphql/generated';
import { addToCart as add } from '../../store/cartReducer';
import { useDispatch } from '../../store';
import ProductSlider from '../../components/product/ProductSlider';
import { FiMinus as Minus, FiPlus as Plus } from 'react-icons/fi';

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
	const {
		loading: productLoading,
		error: productError,
		data: productData,
	} = useProductByHandleQuery({ variables: { handle } });

	const dispatch = useDispatch();
	const [selectedVariant, setSelectedVariant] = useState<CartItem>(null);
	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		const first_variant: any = document.querySelector('.variant');
		first_variant?.click();
	}, [productData]);

	if (productLoading) return <p>Loading...</p>;
	if (productError) return <p>Error..</p>;

	const { variants, images, priceRange, title } = productData.productByHandle;

	const selectVariant = (
		variantId: string,
		variantTitle: string,
		variantImage: string,
		price: number,
		currency: string
	) => {
		let formattedTitle: string;

		if (variants.edges.length > 1) formattedTitle = `${title} - ${variantTitle}`;
		else formattedTitle = title;

		setSelectedVariant({
			variantId,
			title: formattedTitle,
			image: variantImage,
			price,
			currency,
		});
	};

	const addToCart = () => {
		let newItem: CartItem;

		if (selectedVariant) {
			newItem = {
				quantity,
				variantId: selectedVariant.variantId,
				image: selectedVariant.image,
				title: selectedVariant.title,
				price: Number(selectedVariant.price),
				currency: selectedVariant.currency,
			};
		} else {
			newItem = {
				quantity,
				variantId: variants?.edges[0]?.node?.id,
				image: images?.edges[0]?.node?.originalSrc,
				title,
				price: Number(priceRange?.minVariantPrice?.amount),
				currency: priceRange?.minVariantPrice?.currencyCode,
			};
		}

		dispatch(add(newItem));
	};

	return (
		<main className='mb-28'>
			<section className='images'>
				<ProductSlider images={images.edges} />
			</section>

			<section className='content m-4 mt-10 font-primary text-typo-dark'>
				<h1>{selectedVariant ? selectedVariant.title : title}</h1>

				{/* PRICE */}
				<div className='font-semibold my-2'>
					<span>{`${
						selectedVariant ? selectedVariant?.currency : priceRange.minVariantPrice.currencyCode
					} ${selectedVariant ? selectedVariant?.price : priceRange.minVariantPrice.amount}`}</span>
				</div>

				{/* VARIANTS */}
				{variants?.edges?.length > 1 && (
					<section className='mt-4'>
						<p className='uppercase text-xs font-bold'>
							{variants?.edges[0]?.node?.selectedOptions[0]?.name}
						</p>
						<div className='flex justify-start items-center flex-wrap'>
							{variants.edges.map((variant) => {
								const isSelected = variant.node.id === selectedVariant?.variantId;
								return (
									<div
										className={`variant ${
											isSelected
												? 'border-primary-dark bg-primary-light text-white'
												: 'border-typo-light text-typo-dark bg-white'
										} transition-all duration-300 py-3 px-5 font-semibold text-xs border  mr-2 my-2 rounded-md`}
										key={variant.node.id}
										onClick={() =>
											selectVariant(
												variant.node.id,
												variant.node.title,
												variant.node.image.originalSrc,
												variant.node.priceV2.amount,
												variant.node.priceV2.currencyCode
											)
										}
									>
										{variants.edges.length > 1 && variant.node.title}
									</div>
								);
							})}
						</div>
					</section>
				)}

				{/* QUANTITY */}
				<p className='uppercase text-xs font-bold mt-4'>quantity</p>
				<section className='flex justify-start items-center mt-2'>
					<div
						className='border border-primary-dark bg-primary-light flex justify-center items-center rounded-md'
						onClick={() => setQuantity(quantity - 1)}
					>
						<Minus className='text-white w-6 h-6' />
					</div>
					<div className='px-5 py-1 mx-1 rounded-md border border-primary-dark'>{quantity}</div>
					<div
						className='border border-primary-dark bg-primary-light flex justify-center items-center rounded-md'
						onClick={() => setQuantity(quantity + 1)}
					>
						<Plus className='text-white w-6 h-6' />
					</div>
				</section>
			</section>

			{/* ADD TO CART BAR */}
			<section className='fixed bottom-0 left-0 p-4 border-t border-typo-light flex justify-center items-center w-full bg-white'>
				<div
					className='py-2 px-10 bg-primary-light border border-primary-dark rounded-md text-white font-semibold'
					onClick={addToCart}
				>
					Add to Cart
				</div>
			</section>
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

import { FC } from 'react';
import { useCheckoutCreateMutation } from '../../../graphql/generated';
import { useSelector } from '../../../store';

const CheckoutButton: FC = () => {
	const [checkoutCreate] = useCheckoutCreateMutation();
	const cart = useSelector((state) => state.cart.items);

	const checkout = async () => {
		const lineItems = cart.map((item) => {
			return {
				quantity: item.quantity,
				variantId: item.variantId,
			};
		});

		try {
			const checkoutData = await checkoutCreate({ variables: { input: { lineItems } } });
			const checkoutUrl = checkoutData.data?.checkoutCreate?.checkout?.webUrl;
			window.location.href = checkoutUrl;
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className='fixed bottom-0 left-0 w-full border-t border-typo-light p-4 flex justify-center items-center'
			onClick={() => checkout()}
		>
			<div className='bg-primary-light border border-primary-dark rounded-md font-primary text-white py-2 px-10'>
				Checkout
			</div>
		</div>
	);
};

export default CheckoutButton;

import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store';
import { closeCart, initCart, removeFromCart } from '../../../store/cartReducer';
import { FiX as X } from 'react-icons/fi';
import { Transition } from 'react-transition-group';
import CartCard from './CartCard';

const Cart: FC = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);

	const duration = 300;

	const defaultStyle = {
		transition: `all ${duration}ms ease-in-out`,
		transform: 'translateX(100vw)',
	};

	const transitionStyles = {
		entering: { transform: 'translateX(0)' },
		entered: { transform: 'translateX(0)' },
		exiting: { transform: 'translateX(100vw)' },
		exited: { transform: 'translateX(100vw)' },
	};

	useEffect(() => {
		dispatch(initCart());
	}, []);

	return (
		<>
			<Transition in={cart.open} timeout={duration}>
				{(state) => (
					<div
						style={{
							...defaultStyle,
							...transitionStyles[state],
						}}
						className='fixed top-0 right-0 h-screen w-screen bg-white z-10'
					>
						<div
							className='fixed top-4 right-3 flex justify-center items-center z-10'
							onClick={() => dispatch(closeCart())}
						>
							<X className='text-black w-7 h-7' />
						</div>
						<section className='mt-10'>
							<h3 className='text-center font-primary font-semibold mb-10'>Shopping Bag</h3>
							{cart.items.length === 0 && (
								<p className='font-primary text-center'>Your bag is empty</p>
							)}
							{cart.items.length > 0 &&
								cart.items.map((item) => (
									<CartCard
										key={item.variantId}
										variantId={item.variantId}
										title={item.title}
										price={item.price}
										currency={item.currency}
										image={item.image}
										quantity={item.quantity}
									/>
								))}
						</section>
					</div>
				)}
			</Transition>
		</>
	);
};

export default Cart;

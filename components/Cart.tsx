import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../store';
import { initCart, removeFromCart } from '../store/cartReducer';

const Cart: FC = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.items);

	useEffect(() => {
		dispatch(initCart());
	}, []);

	return (
		<div>
			{cart.map((item) => (
				<div key={item.variantId}>
					<img src={item.image} alt={item.title} width={50} />
					<span>{item.title}</span>
					<span>qty: {item.quantity}</span>
					<span>
						{item.currency} {item.price}
					</span>
					<div onClick={() => dispatch(removeFromCart(item.variantId))}>X</div>
				</div>
			))}
		</div>
	);
};

export default Cart;

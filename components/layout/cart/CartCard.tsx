import { FC } from 'react';
import { useDispatch } from '../../../store';
import { removeFromCart } from '../../../store/cartReducer';

type CartCardProps = {
	variantId: string;
	title: string;
	image: string;
	quantity: number;
	currency: string;
	price: number;
};

const CartCard: FC<CartCardProps> = ({ variantId, title, quantity, image, currency, price }) => {
	const dispatch = useDispatch();

	return (
		<div className='p-4 bg-white shadow-md flex justify-between font-primary mb-4'>
			<div className='border border-primary-dark'>
				<img src={image} alt={title} width={80} />
			</div>

			<div className='flex-1 flex flex-col px-4 justify-between'>
				<div className='flex items-center'>
					<p className='mr-2'>{title}</p>
					<p className=''>x {quantity}</p>
				</div>
				<p className='text-primary-light' onClick={() => dispatch(removeFromCart(variantId))}>
					Remove
				</p>
			</div>

			<div className='flex items-end font-semibold text-lg'>
				<p>
					{currency} {price}
				</p>
			</div>
		</div>
	);
};

export default CartCard;

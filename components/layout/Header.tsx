import { FC } from 'react';
import { FiMenu as Burger, FiShoppingBag as Bag } from 'react-icons/fi';
import { useDispatch, useSelector } from '../../store';
import { openCart } from '../../store/cartReducer';
import { openMenu } from '../../store/menuReducer';

const Header: FC = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.items);

	return (
		<header className='py-4 px-4 shadow-md'>
			<div className='container mx-auto flex justify-between items-center'>
				<div onClick={() => dispatch(openMenu())}>
					<Burger className='text-primary-light w-6 h-6' />
				</div>
				<div>logo</div>
				<div className='relative' onClick={() => dispatch(openCart())}>
					<Bag className='text-black w-6 h-6' />
					{/* Bag Amount Indicator */}
					{cart.length > 0 && (
						<div className='absolute -bottom-1 right-0 h-3 w-3 bg-primary-light rounded-full flex justify-center items-center'>
							<span className='text-white font-bold' style={{ fontSize: '0.5rem' }}>
								{cart.length}
							</span>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;

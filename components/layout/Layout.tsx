import { FC } from 'react';
import { useSelector } from '../../store';
import Cart from './cart/Cart';
import Header from './Header';
import Menu from './menu/Menu';

const Layout: FC = ({ children }) => {
	const cart = useSelector((state) => state.cart);
	// const menu = useSelector((state) => state.menu);

	return (
		<main className='min-h-screen w-full flex flex-col'>
			<Menu />
			<Cart />
			<Header />
			<div className='container mx-auto flex-1 flex flex-col '>{children}</div>
		</main>
	);
};

export default Layout;

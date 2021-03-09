import { FC } from 'react';
import { FiX as X } from 'react-icons/fi';
import { useDispatch, useSelector } from '../../../store';
import { closeMenu } from '../../../store/menuReducer';
import { Transition } from 'react-transition-group';
import MenuItems from './MenuItems';

const Menu: FC = () => {
	const dispatch = useDispatch();
	const menu = useSelector((state) => state.menu);

	const duration = 300;

	const defaultStyle = {
		transition: `all ${duration}ms ease-in-out`,
		transform: 'translateX(-100vw)',
	};

	const transitionStyles = {
		entering: { transform: 'translateX(0)' },
		entered: { transform: 'translateX(0)' },
		exiting: { transform: 'translateX(-100vw)' },
		exited: { transform: 'translateX(-100vw)' },
	};

	return (
		<>
			<Transition in={menu.open} timeout={duration}>
				{(state) => (
					<nav
						style={{
							...defaultStyle,
							...transitionStyles[state],
						}}
						className='fixed top-0 left-0 w-screen h-screen bg-white z-10 overflow-x-hidden'
					>
						<div
							className='fixed top-4 right-3 flex justify-center items-center'
							onClick={() => dispatch(closeMenu())}
						>
							<X className='text-black w-7 h-7' />
						</div>

						<MenuItems />
					</nav>
				)}
			</Transition>
		</>
	);
};

export default Menu;

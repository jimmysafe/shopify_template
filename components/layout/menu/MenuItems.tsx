import { FC } from 'react';
import { useSelector } from '../../../store';
import { Transition } from 'react-transition-group';
import Collections from './Collections';
import Categories from './Categories';
import BackButton from './BackButton';

const duration = 300;

const defaultStyle = {
	transition: `all ${duration}ms ease-in-out`,
	transform: 'translateX(0px)',
};

const transitionStyles = {
	entering: { transform: 'translateX(0px)' },
	entered: { transform: 'translateX(0px)' },
	exiting: { transform: 'translateX(-100vw)' },
	exited: { transform: 'translateX(-100vw)' },
};

const MenuItems: FC = () => {
	const submenu = useSelector((state) => state.menu.subMenu);

	const isSubmenu = submenu.length > 0;

	return (
		<div className='menu-items mt-10 relative'>
			{isSubmenu && <BackButton />}
			<Transition in={!isSubmenu} timeout={duration}>
				{(state) => (
					<div
						className='flex justify-center items-start'
						style={{
							width: '200vw',
							...defaultStyle,
							...transitionStyles[state],
						}}
					>
						<Collections />
						<Categories />
					</div>
				)}
			</Transition>
		</div>
	);
};

export default MenuItems;

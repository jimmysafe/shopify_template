import { FC } from 'react';
import menu_items from '../../../menu/menu.json';
import { useDispatch } from '../../../store';
import { showSubMenu } from '../../../store/menuReducer';
import { FiArrowRight as NextArrow } from 'react-icons/fi';

const Collections: FC = () => {
	const dispatch = useDispatch();
	return (
		<div className='flex flex-col items-center justify-center flex-1'>
			{menu_items.map((item) => (
				<div
					key={item.handle}
					className='my-4 text-black font-semibold text-lg flex items-center'
					onClick={() => dispatch(showSubMenu(item.items))}
				>
					<span>{item.title}</span>
					<NextArrow className='ml-2 text-black w-5 h-5' />
				</div>
			))}
		</div>
	);
};

export default Collections;

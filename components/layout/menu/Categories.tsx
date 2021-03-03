import { FC } from 'react';
import { useSelector } from '../../../store';

const Categories: FC = () => {
	const submenu = useSelector((state) => state.menu.subMenu);

	return (
		<div className='flex flex-col items-center justify-center flex-1'>
			{submenu.map((item) => (
				<div
					key={item}
					className='my-4 text-black font-semibold text-lg'
					onClick={() => console.log('clicked: ', item)}
				>
					<span>{item}</span>
				</div>
			))}
		</div>
	);
};

export default Categories;

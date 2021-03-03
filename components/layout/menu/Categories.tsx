import { useRouter } from 'next/dist/client/router';
import { FC } from 'react';
import { useDispatch, useSelector } from '../../../store';
import { closeMenu } from '../../../store/menuReducer';

const Categories: FC = () => {
	const dispatch = useDispatch();
	const submenu = useSelector((state) => state.menu.subMenu);
	const router = useRouter();

	return (
		<div className='flex flex-col items-center justify-center flex-1'>
			{submenu.map((item) => (
				<div
					key={item}
					className='my-4 text-black font-semibold text-lg'
					onClick={() => {
						dispatch(closeMenu());
						router.push(`/products/${item}`);
					}}
				>
					<span>{item}</span>
				</div>
			))}
		</div>
	);
};

export default Categories;

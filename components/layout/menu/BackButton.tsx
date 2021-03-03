import { FC } from 'react';
import { useDispatch } from '../../../store';
import { hideSubMenu } from '../../../store/menuReducer';
import { FiArrowLeft as BackArrow } from 'react-icons/fi';

const BackButton: FC = () => {
	const dispatch = useDispatch();

	return (
		<div
			className='fixed top-4 left-3 flex justify-center items-center'
			onClick={() => dispatch(hideSubMenu())}
		>
			<BackArrow className='text-black w-7 h-7' />
		</div>
	);
};

export default BackButton;

import { useRouter } from 'next/router';
import { FC } from 'react';
import { useMenuQuery } from '../../../graphql/generated';
import { useDispatch } from '../../../store';
import { closeMenu } from '../../../store/menuReducer';

const MenuItems: FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, error, data } = useMenuQuery();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error..</p>;

	const navigateToCollection = (collectionHandle: string) => {
		dispatch(closeMenu());
		router.push(`/collections/${collectionHandle}`);
	};

	return (
		<div className='menu-items mt-10 relative'>
			<div className='flex justify-center items-start'>
				<div className='flex flex-col items-center justify-center flex-1'>
					{data.collections.edges.map((item) => (
						<div
							key={item.node.handle}
							className='my-4 text-black font-semibold text-lg flex items-center'
							onClick={() => navigateToCollection(item.node.handle)}
						>
							<span>{item.node.title}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MenuItems;

import { useRouter } from 'next/router';
import { FC } from 'react';
import { useMenuQuery } from '../../../graphql/generated';
import { useDispatch } from '../../../store';
import { closeMenu } from '../../../store/menuReducer';
import Loading from '../Loading';

const MenuItems: FC = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { loading, error, data } = useMenuQuery();

	if (loading) return <Loading />;
	if (error) return <p>Error..</p>;

	const navigateToCollection = (collectionHandle: string) => {
		dispatch(closeMenu());
		router.push(`/collections/${collectionHandle}`);
	};

	return (
		<div className='menu-items mt-14 relative'>
			<div className='flex justify-center items-start'>
				<div className='flex flex-col items-center justify-center flex-1'>
					{data.collections.edges.map((item) => (
						<div
							key={item.node.handle}
							className='w-full py-8 my-1 text-black font-semibold text-lg flex items-center justify-center bg-center bg-cover bg-opacity-0'
							style={{
								backgroundImage: `url('https://cdn.shopify.com/s/files/1/0549/8509/7399/collections/lfndtoirttvx_375x375.jpg?v=1615306970')`,
							}}
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

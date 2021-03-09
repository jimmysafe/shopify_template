import { useRouter } from 'next/router';
import { FC } from 'react';

type FilterProps = {
	types: string[];
	collection: string;
};

const Filter: FC<FilterProps> = ({ collection, types }) => {
	const router = useRouter();
	return (
		<div
			className='overflow-x-auto p-4 font-primary flex items-stretch justify-start'
			style={{ minWidth: '400vw' }}
		>
			{types.map((type) => (
				<span
					className={`${
						router.query.filter === type
							? 'border-primary-dark bg-primary-light text-white'
							: 'border-typo-light text-typo-dark bg-white'
					} transition-all duration-300 font-semibold text-xs border rounded-md mx-1 px-5 py-2 flex justify-center items-center text-center`}
					key={type}
					onClick={() => {
						router.push({
							pathname: '/collections/[collection]',
							query: {
								collection,
								filter: type,
							},
						});
					}}
				>
					{type}
				</span>
			))}
		</div>
	);
};

export default Filter;

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Loading from '../../components/layout/Loading';
import CollectionList from '../../components/list/CollectionList';
import Filter from '../../components/list/Filter';
import FilteredList from '../../components/list/FilteredList';
import { useCollectionTypesQuery } from '../../graphql/generated';

type CollectionPageProps = {
	collection: string;
};

const CollectionPage: NextPage<CollectionPageProps> = ({ collection }) => {
	const router = useRouter();
	const { data: productTypes, loading, error } = useCollectionTypesQuery({
		variables: { handle: collection },
	});

	if (loading) return <Loading />;
	if (error) return <p>Error...</p>;

	const types = productTypes?.collectionByHandle.products.edges
		.map((product) => {
			return product.node.productType;
		})
		.filter((v, i, a) => a.indexOf(v) === i);

	return (
		<div>
			<h1 className='font-primary font-semibold text-2xl text-center my-4'>
				{collection.charAt(0).toUpperCase() + collection.slice(1)}
			</h1>
			<Filter types={types ? types : []} collection={collection} />
			{router.query.filter ? (
				<FilteredList productType={router.query.filter} />
			) : (
				<CollectionList collection={collection} />
			)}
		</div>
	);
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			collection: params.collection,
		},
	};
};

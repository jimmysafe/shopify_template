import { NextPage } from 'next';
import { useProductsQuery } from '../graphql/generated';

const Home: NextPage = () => {
	const { loading, error, data } = useProductsQuery();

	return <div className='font-primary'>index</div>;
};

export default Home;

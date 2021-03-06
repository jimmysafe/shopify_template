import { NextPage } from 'next';
import { SyntheticEvent, useRef, useState } from 'react';
import { useCustomerLoginMutation } from '../../graphql/generated';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
	const router = useRouter();
	const [error, setError] = useState<string>(null);

	const [loginCustomer] = useCustomerLoginMutation();

	const email = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);

	const login = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			setError(null);
			const loggedCustomer = await loginCustomer({
				variables: {
					input: {
						email: email.current.value,
						password: email.current.value,
					},
				},
			});

			const {
				customerAccessToken,
				customerUserErrors: loginErrors,
			} = loggedCustomer.data.customerAccessTokenCreate;

			if (!customerAccessToken) {
				setError(loginErrors[0].message);
				return;
			}

			Cookies.set('token', customerAccessToken.accessToken, {
				expires: 30,
				// secure: true,
			});

			router.push('/');
		} catch (err) {
			console.log(err);
			setError(err.message);
		}
	};

	return (
		<div className='flex-1 w-full flex flex-col justify-center items-center font-primary'>
			<form onSubmit={login} className='mx-8 flex flex-col shadow-lg rounded-md overflow-x-hidden'>
				<h1 className='bg-primary-light py-2 text-center uppercase text-sm font-semibold text-white'>
					Login
				</h1>
				<div className='p-4'>
					<input
						ref={email}
						className='my-2 border border-typo-light shadow-sm w-full py-2 px-2 rounded-sm'
						type='email'
						placeholder='Email'
						required
					/>
					<input
						ref={password}
						className='my-2 border border-typo-light shadow-sm w-full py-2 px-2 rounded-sm'
						type='password'
						placeholder='Password'
						required
					/>
				</div>
				{error && <p className='text-red-500 text-center mb-4'>{error}</p>}
				<button className='bg-primary-light border border-primary-dark rounded-md font-primary text-white py-2 px-10 w-40 flex justify-center items-center mx-auto mb-6'>
					Login
				</button>
			</form>
			<div className='mt-8 text-center'>
				<p>Don't have an account? </p>
				<p className='text-primary-dark'>Sign up</p>
			</div>
		</div>
	);
};

export default LoginPage;

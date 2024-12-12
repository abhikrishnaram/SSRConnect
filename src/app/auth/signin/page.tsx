import { redirect } from 'next/navigation';

import LoginForm from './form';

import { auth } from '@auth';

const LoginPage = async ({ searchParams }) => {

  const session = await auth();
  if(session?.user) redirect(searchParams.callback ? searchParams.callback : '/dashboard');
  
  return (
      <div className="flex items-center justify-center flex-col ">
          <LoginForm callback={searchParams.callback} error={searchParams?.error} />
      </div>
  );
};

export default LoginPage;

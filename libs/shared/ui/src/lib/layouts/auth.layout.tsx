import Image from 'next/image';
import { Logo } from '../components/logo';
import SideImage from '/public/auth-pages-bg.png';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@hbo-ict/query-fns';
import Router from 'next/router';

/**
 * layout for the auth pages. can also be used for the landing page. returns a grid with 2 columns.
 * @param param0
 * @returns
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { data: authData, isLoading } = useQuery({
    queryKey: ['isAuthenticated'],
    queryFn: Api.me,
    retry: false,
  });

  if (authData) {
    Router.replace('/workspace');
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white bg-opacity-50">
        <div className="w-20 h-20 border-4 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-screen md:grid md:grid-cols-3">
      <div className="bg-secondary  col-span-2 hidden md:flex md:justify-center md:items-center">
        <Image
          src={SideImage}
          alt=""
          priority
          width={500}
          height={500}
          className={'object-cover w-1/2 '}
        />
      </div>
      <div className=" p-4 md:col-span-1 col-span-1 flex items-center justify-center">
        <div className="flex flex-col w-full md:w-11/12 ">
          <Logo variant="default" asLink />
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}

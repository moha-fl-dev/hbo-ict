import { useCurrentUser } from '@hbo-ict/hooks';
import Router from 'next/router';
import { Logo } from '../components/logo';

/**
 * layout for the auth pages. can also be used for the landing page. returns a grid with 2 columns.
 * @param param0
 * @returns
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { currentUser } = useCurrentUser();
  if (currentUser) {
    Router.replace('/workspace');
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100/30">
      <div className="w-full bg-white rounded p-4 shadow-md border xl:max-w-md md:max-w-2xl">
        <Logo variant="default" asLink />
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}

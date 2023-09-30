import Image from 'next/image';
import { Logo } from '../components/logo';
import SideImage from '/public/auth-pages-bg.png';

export function AuthLayout({ children }: { children: React.ReactNode }) {
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

import Image from 'next/image';
import SideImage from '../../public/auth-pages-bg.png';
import { Logo } from '@hbo-ict/ui';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen md:grid md:grid-cols-3">
      <div className="bg-secondary  col-span-2 hidden md:flex md:justify-center md:items-center">
        <Image
          src={SideImage}
          alt=""
          priority
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

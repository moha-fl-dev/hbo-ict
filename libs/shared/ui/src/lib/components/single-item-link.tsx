import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

type SingleItemLinkWithChevronRightIcon = {
  name: string;
  href: string;
};

export function SingleItemLinkWithChevronRightIcon<
  T extends SingleItemLinkWithChevronRightIcon,
>({ item }: { item: T }) {
  return (
    <Link
      href={item.href}
      className="flex flex-row items-center rounded justify-between bg-gray-200 p-2 hover:bg-gray-100 transition-colors group border"
    >
      <span>{item.name}</span>
      <ChevronRightIcon className="transform group-hover:translate-x-1 transition-transform duration-200" />
    </Link>
  );
}

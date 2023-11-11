import Link from 'next/link';
import { WORKSPACE_MENU } from '../constants';
import { ListItem } from './listItem';
import type { WorkspaceMenu } from '../types';
import { useRouter } from 'next/router';

export function WorkspaceMenu() {
  const router = useRouter();

  return (
    <ul
      className="flex flex-col gap-2 items-start justify-start content-start"
      key={'root-workspace-menu'}
    >
      {WORKSPACE_MENU.map((menuItem, i) => {
        return (
          <MenuItem
            {...menuItem}
            active={router.pathname === menuItem.path}
            key={i}
          />
        );
      })}
    </ul>
  );
}

function MenuItem({ active, icon, name, path }: WorkspaceMenu) {
  return (
    <Link href={path} className="w-full" key={'workspace-menu-link-item'}>
      <ListItem variant={active === true ? 'active' : 'default'}>
        <div className="flex flex-row gap-2 items-center align-middle w-full">
          {icon}
          <span>{name}</span>
        </div>
      </ListItem>
    </Link>
  );
}

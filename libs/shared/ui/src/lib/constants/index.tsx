import type { WorkspaceMenu } from '../types';

import {
  DiscIcon,
  GearIcon,
  GroupIcon,
  ListBulletIcon,
  MixIcon,
} from '@radix-ui/react-icons';

export const WORKSPACE_MENU: WorkspaceMenu[] = [
  {
    name: 'Tickets',
    path: '/workspace/tickets',
    icon: <ListBulletIcon />,
    active: false,
  },
  {
    name: 'Departments',
    path: '/workspace/manage/departments',
    icon: <DiscIcon />,
    active: false,
  },
  {
    name: 'Teams',
    path: '/workspace/manage/teams',
    icon: <GroupIcon />,
    active: false,
  },
  {
    name: 'Components',
    path: '/workspace/manage/components',
    icon: <MixIcon />,
    active: false,
  },
  {
    name: 'Settings',
    path: '/workspace/manage/account',
    icon: <GearIcon />,
    active: false,
  },
];

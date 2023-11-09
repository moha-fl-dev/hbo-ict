import { useCurrentUser, usePerformSignOut } from '@hbo-ict/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/dropdown.menu';
import { Button } from '../components/button';
import { AvatarIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function UserDropDown() {
  const { currentUser } = useCurrentUser();
  const { signOut } = usePerformSignOut();

  function handlerSignOut() {
    signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant={'outline'}
          size={'icon'}
          className="flex flex-row gap-2"
        >
          <AvatarIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-5">
        <DropdownMenuLabel>{currentUser?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/workspace/manage/account">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlerSignOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

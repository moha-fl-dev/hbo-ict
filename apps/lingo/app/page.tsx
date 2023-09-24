import {
  Button,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogHeader,
} from '@hbo-ict/ui';
import Link from 'next/link';

export default async function Index() {
  return (
    <div>
      <div className="flex flex-row justify-center mt-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Button variant={'default'}>Default</Button>
            <Button variant={'secondary'}>Secondary</Button>
            <Button variant={'destructive'}>Destructive</Button>
            <Button variant={'ghost'}>Ghost</Button>
            <Button variant={'link'}>Link</Button>
            <Button variant={'outline'}>Outline</Button>
            <Button asChild>
              <Link href="sign-up">Sign up</Link>
            </Button>
            <Button asChild variant={'link'}>
              <Link href="sign-in">Sign in</Link>
            </Button>
          </div>
          <div className="flex flex-row gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'secondary'}>Open</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}

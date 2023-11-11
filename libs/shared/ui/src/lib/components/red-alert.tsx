import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Alert, AlertDescription, AlertTitle } from './alert';
import type { FC } from 'react';

type WithNoTitleProps = {
  description: string;
};

type WithTitleProps = WithNoTitleProps & {
  title: string;
};

const RedAlertWithNoTitle: FC<WithNoTitleProps> = ({ description }) => {
  return (
    <Alert variant="destructive">
      <div className="flex flex-row gap-2 align-middle items-center">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertDescription>{description}</AlertDescription>
      </div>
    </Alert>
  );
};

const RedAlertWithTitle: FC<WithTitleProps> = ({ description, title }) => {
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export { RedAlertWithNoTitle, RedAlertWithTitle };

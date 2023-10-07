import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Workspace() {
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: Api.workspaceRoot,
    retry: false,
  });

  if (error) {
    router.push('/sign-in');
  }

  return (
    <div>
      <div>
        {isLoading ? <div>Loading...</div> : <div>{JSON.stringify(data)}</div>}
      </div>
    </div>
  );
}

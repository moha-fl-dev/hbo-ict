import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function Workspace() {
  const router = useRouter();
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: Api.workspaceRoot,
  });

  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: Api.me,
  });

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {JSON.stringify(data)}

            {JSON.stringify(userQuery.data)}
          </div>
        )}
      </div>
    </div>
  );
}

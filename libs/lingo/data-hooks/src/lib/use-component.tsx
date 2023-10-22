import { Component } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useComponents() {
  const { data, isError } = useQuery<Component[]>({
    queryKey: ['components'],
    queryFn: Api.component.getAll,
  });

  return {
    components: data,
    isError,
  };
}

export function useComponent(componentId: string) {
  const { data, isError } = useQuery<Component>(
    ['component', componentId],
    () => Api.component.getById(componentId),
    { enabled: !!componentId }
  );

  return {
    component: data,
    isError,
  };
}

// export function useComponentWithTeams(componentId: string) {
//   const { data, isError } = useQuery<Component>(
//     ['component-teams', componentId],
//     () => Api.component.getByIdWithTeams(componentId),
//     { enabled: !!componentId }
//   );

//   return {
//     component: data,
//     isError,
//   };
// }
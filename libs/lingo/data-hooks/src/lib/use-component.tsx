import type {
  Component,
  ComponentWithTicketsCount,
} from '@hbo-ict/lingo/types';
import { component } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useComponents() {
  const { data, isError } = useQuery<ComponentWithTicketsCount[]>({
    queryKey: ['components'],
    queryFn: component.getAll,
  });

  return {
    components: data,
    isError,
  };
}

export function useComponent(componentId: string) {
  const { data, isError } = useQuery<Component>(
    ['component', componentId],
    () => component.getById(componentId),
    { enabled: !!componentId },
  );

  return {
    component: data,
    isError,
  };
}

export function useComponentsWithTeamId(teamId: string) {
  const { data, isError } = useQuery<Component[]>(
    ['components-by-team', teamId],
    () => component.getComponentsByTeamId(teamId),
    { enabled: !!teamId },
  );

  return {
    components: data,
    isError,
  };
}

// export function useComponentWithTeams(componentId: string) {
//   const { data, isError } = useQuery<Component>(
//     ['component-teams', componentId],
//     () => component.getByIdWithTeams(componentId),
//     { enabled: !!componentId }
//   );

//   return {
//     component: data,
//     isError,
//   };
// }

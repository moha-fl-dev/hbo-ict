import type {
  StrictTeamWithDepartment,
  Team,
  TeamWithTicketsAndComponentsCount,
} from '@hbo-ict/lingo/types';
import { team } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useTeams() {
  const { data, isError } = useQuery<TeamWithTicketsAndComponentsCount[]>({
    queryKey: ['teams'],
    queryFn: team.getAll,
  });

  return {
    teams: data,
    isError,
  };
}

export function useTeam(teamId: string) {
  const { data, isError } = useQuery<StrictTeamWithDepartment>(
    ['team', teamId],
    () => team.getById(teamId),
    { enabled: !!teamId },
  );

  return {
    team: data,
    isError,
  };
}

export function useTeamsWithDepartment(teamId: string) {
  const { data, isError } = useQuery<
    Array<Pick<Team, 'departmentId' | 'name' | 'id'>>
  >(['team-department', teamId], () => team.getTeamsByDepartmentId(teamId), {
    enabled: !!teamId,
  });

  return {
    teams: data,
    isError,
  };
}

import type { StrictTeamWithDepartment, Team } from '@hbo-ict/lingo/types';
import { Api } from '@hbo-ict/query-fns';
import { useQuery } from '@tanstack/react-query';

export function useTeams() {
  const { data, isError } = useQuery<Team[]>({
    queryKey: ['teams'],
    queryFn: Api.team.getAll,
  });

  return {
    teams: data,
    isError,
  };
}

export function useTeam(teamId: string) {
  const { data, isError } = useQuery<StrictTeamWithDepartment>(
    ['team', teamId],
    () => Api.team.getById(teamId),
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
  >(
    ['team-department', teamId],
    () => Api.team.getTeamsByDepartmentId(teamId),
    { enabled: !!teamId },
  );

  return {
    teams: data,
    isError,
  };
}

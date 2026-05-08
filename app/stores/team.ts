const teamListMap = new Map<TeamDetails['id'], TeamDetails>(DETAILED_TEAM_LIST.map(team => [team.id, team]));

export const useTeamStore = defineStore('team', () => {
  const focusedTeamId = ref<TeamDetails['id'][]>([]);

  const getTeamById = (id?: TeamDetails['id'] | null) => teamListMap.get(id ?? '');

  function focusMatchTeams({ homeTeam, awayTeam }: Match) {
    for (const team of [homeTeam.id, awayTeam.id]) {
      if (team !== null && !focusedTeamId.value.includes(team)) {
        focusedTeamId.value.push(team);
      }
    }
  }

  function blurMatchTeams({ homeTeam, awayTeam }: Match) {
    focusedTeamId.value = focusedTeamId.value.filter(i => i !== homeTeam.id && i !== awayTeam.id);
  }

  return {
    focusedTeamId,
    getTeamById,
    focusMatchTeams,
    blurMatchTeams,
  };
});

export const useTeamStore = defineStore('team', () => {
  const focusedTeamId = ref<TeamDetails['id'][]>([]);

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
    focusMatchTeams,
    blurMatchTeams,
  };
});

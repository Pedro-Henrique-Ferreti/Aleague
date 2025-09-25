export function getTournamentIcon(id: Tournament['iconId']) {
  return `/images/icons/tournament/icon-${id}.svg`;
}

export function createStage(tournament: Tournament, stageForm: TournamentStageForm) {
  const baseStage: BaseTournamentStage = {
    id: new Date().getTime(),
    sequence: (tournament.stages[tournament.stages.length - 1]?.sequence || 0) + 1,
    name: stageForm.name,
    type: stageForm.type,
    teams: stageForm.teams,
  };

  if (baseStage.type === TournamentStageType.GROUPS) {
    const stage: TournamentGroupsStage = {
      ...baseStage,
      type: baseStage.type,
      rules: {
        format: stageForm.format,
        groups: stageForm.groups,
        teamsPerGroup: stageForm.teamsPerGroup,
        rounds: stageForm.groupsRounds,
      },
    };

    return stage;
  }

  const stage: TournamentPlayoffsStage = {
    ...baseStage,
    type: baseStage.type,
    rounds: [],
  };

  return stage;
}

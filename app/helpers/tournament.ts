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

  const groupStage = (): TournamentGroupsStage => ({
    ...baseStage,
    type: TournamentStageType.GROUPS,
    rules: {
      format: stageForm.format,
      groups: stageForm.groups,
      teamsPerGroup: stageForm.teamsPerGroup,
      rounds: stageForm.groupsRounds,
    },
    groups: Array.from({ length: stageForm.groups }, (_, index) => ({
      order: index + 1,
    })),
  });

  const playoffStage = (): TournamentPlayoffsStage => ({
    ...baseStage,
    type: TournamentStageType.PLAYOFFS,
    rounds: [],
  });

  return stageForm.type === TournamentStageType.GROUPS ? groupStage() : playoffStage();
}

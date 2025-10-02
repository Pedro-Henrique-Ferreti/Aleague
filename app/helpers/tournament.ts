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
      teamsPerGroup: stageForm.teamsPerGroup,
      rounds: stageForm.groupRounds,
    },
    groups: Array.from({ length: stageForm.groups }, (_, index) => ({
      order: index + 1,
      standings: Array.from({ length: stageForm.teamsPerGroup }, (_, index) => ({
        id: index,
        position: index + 1,
        points: 0,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        team: null,
      })),
    })),
    matchweeks: [],
  });

  const playoffStage = (): TournamentPlayoffsStage => ({
    ...baseStage,
    type: TournamentStageType.PLAYOFFS,
    rounds: [],
  });

  return stageForm.type === TournamentStageType.GROUPS ? groupStage() : playoffStage();
}

export function createMatchweeks(stage: TournamentGroupsStage): TournamentGroupsStage['matchweeks'] {
  return [
    { week: 1, matches: [] },
  ];
}

import { createMatchweekFromTeamList, getMatchweeksPerRound } from './matchweek';

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
  const { format } = stage.rules;
  const matchweeksPerRound = getMatchweeksPerRound(stage.groups, format);

  let matchweeks: Matchweek[] = Array.from({ length: matchweeksPerRound }, (_, index) => ({
    week: index + 1,
    matches: [],
  }));

  const addToMatchweeks = (items: Array<Match[]>) => {
    items.forEach((item, index) => {
      matchweeks[index]!.matches.push(...item);
    });
  };

  if (format === TournamentGroupFormat.ROUND_ROBIN) {
    stage.groups.forEach((group) => (
      addToMatchweeks(createMatchweekFromTeamList(group.standings.map((i) => i.team!.id)))
    ));
  } else {
    const items = createMatchweekFromTeamList(stage.groups.flatMap((g) => g.standings.map((i) => i.team!.id)));

    if (format === TournamentGroupFormat.OTHER_GROUPS_ROUND_ROBIN) {
      // Remove matches where both teams are from the same group
      items.forEach((week, index) => {
        items[index] = week.filter((match) => {
          const bothTeamFromSameGroup = stage.groups.find((g) => {
            const teams = g.standings.map((s) => s.team?.id);
            
            return teams.includes(match.homeTeam.id) && teams.includes(match.awayTeam.id);
          });

          return !bothTeamFromSameGroup;
        });
      });
    }

    addToMatchweeks(items);
  }

  // Remove matchweeks without matches
  matchweeks = matchweeks.filter((matchweek) => matchweek.matches.length > 0).map((matchweek, index) => ({
    ...matchweek,
    week: index + 1,
  }));

  return matchweeks;
}

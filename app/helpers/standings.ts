import { getMatchResult } from './match';

export function getStandingsDataFromScore(homeScore: number, awayScore: number, isHomeTeam: boolean) {
  const goalsFor = isHomeTeam ? homeScore : awayScore;
  const goalsAgainst = isHomeTeam ? awayScore : homeScore;
  const won = goalsFor > goalsAgainst;
  const drawn = goalsFor === goalsAgainst;

  return {
    goalsFor,
    goalsAgainst,
    won: won ? 1 : 0,
    drawn: drawn ? 1 : 0,
    lost: goalsFor < goalsAgainst ? 1 : 0,
    points: won ? POINTS_PER_WIN : drawn ? POINTS_PER_DRAW : POINTS_PER_LOSE,
  };
}

export function sortTableEntryByType(a: TableEntry, b: TableEntry, sortType: TableEntrySortType): number {
  switch (sortType) {
    case TableEntrySortType.POINTS:
      return b.points - a.points;
    case TableEntrySortType.WON:
      return b.won - a.won;
    case TableEntrySortType.LOST:
      return a.lost - b.lost;
    case TableEntrySortType.GOALS_FOR:
      return b.goalsFor - a.goalsFor;
    case TableEntrySortType.GOALS_AGAINST:
      return a.goalsAgainst - b.goalsAgainst;
    case TableEntrySortType.GOALS_DIFFERENCE:
      return (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);
  }
}

export function sortTableEntries(a: TableEntry, b: TableEntry, sortType: TableEntrySortType): number {
  const result = sortTableEntryByType(a, b, sortType);
  
  if (result !== 0) return result;

  if (a.played === 0 && b.played === 0) return 0;

  // First tiebraker: victories
  const wonDiff = b.won - a.won;

  if (wonDiff !== 0) return wonDiff;

  // Second tiebraker: goals difference
  const goalDiff = (b.goalsFor - b.goalsAgainst) - (a.goalsFor - a.goalsAgainst);

  if (goalDiff !== 0) return goalDiff;

  // Third tiebraker: best defense
  const gaDiff = b.goalsAgainst - a.goalsAgainst;

  if (gaDiff !== 0) return gaDiff;

  // Fourth tiebraker: best attck
  const gfDiff = b.goalsFor - a.goalsFor;

  if (gfDiff !== 0) return gfDiff;

  // Fourth tiebreaker: random
  return Math.random() > 0.5 ? 1 : -1;
}

export function getTableEntryForm(matchweeks: Matchweek[], teamId: StandingsEntry['team']): TableEntry['form'] {
  if (!teamId) return [];

  const forms: TableEntry['form'] = [];

  for (const week of matchweeks) {
    const match = week.matches.find((m) => (
      (m.homeTeam.id === teamId || m.awayTeam.id === teamId)
      && m.homeTeam.score !== null
      && m.awayTeam.score !== null
    ));

    if (match) {
      forms.push({
        match,
        week: week.week,
        result: getMatchResult(match.homeTeam.score!, match.awayTeam.score!, match.homeTeam.id === teamId),
      });
    }
  }

  return forms;
}

export function getTableEntry(entry: StandingsEntry, type: TableEntryType): TableEntry {
  let data: StandingsData = {
    points: entry.home.points + entry.away.points,
    played: entry.home.played + entry.away.played,
    won: entry.home.won + entry.away.won,
    drawn: entry.home.drawn + entry.away.drawn,
    lost: entry.home.lost + entry.away.lost,
    goalsFor: entry.home.goalsFor + entry.away.goalsFor,
    goalsAgainst: entry.home.goalsAgainst + entry.away.goalsAgainst,
    form: [...entry.home.form ?? [], ...entry.away.form ?? []].sort((a, b) => a.week - b.week),
  };

  if (type === TableEntryType.HOME) {
    data = entry.home;
  } else if (type === TableEntryType.AWAY) {
    data = entry.away;
  }

  return {
    id: entry.id,
    team: entry.team,
    ...data,
  };
}

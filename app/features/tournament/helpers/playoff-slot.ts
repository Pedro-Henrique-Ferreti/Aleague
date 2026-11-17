import { isMatchComplete, isMatchSeeded, newMatch } from './match';
import { simulateMatchScore } from './match-simulation';

export function newPlayoffRoundSlot(index: number): PlayoffRoundSlot {
  return {
    id: uuidv4(),
    order: index,
    legs: [newMatch()],
  };
}

export function getPlayoffRoundSlotWinner(slot: PlayoffRoundSlot): PlayoffRoundSlotWinner {
  if (slot.legs.some(match => !isMatchComplete(match))) return null;

  const [firstLeg, secondLeg] = slot.legs;

  const homeScore = firstLeg.homeTeam.score! + (secondLeg?.awayTeam.score ?? 0);
  const awayScore = firstLeg.awayTeam.score! + (secondLeg?.homeTeam.score ?? 0);

  if (homeScore > awayScore) return slot.legs[0].homeTeam.id;
  if (homeScore < awayScore) return slot.legs[0].awayTeam.id;
  return null;
}

export function simulatePlayoffRoundSlotScore(slot: PlayoffRoundSlot, preserveIfDecided?: boolean) {
  if (
    slot.legs.some(match => !isMatchSeeded(match))
    || (preserveIfDecided && getPlayoffRoundSlotWinner(slot) !== null)
  ) {
    return;
  }

  do {
    for (const match of slot.legs) {
      const { home, away } = simulateMatchScore(match.homeTeam.id, match.awayTeam.id);
      match.homeTeam.score = home;
      match.awayTeam.score = away;
    }
  }
  while (getPlayoffRoundSlotWinner(slot) === null);
}

export function addSecondLegToSlot(slot: PlayoffRoundSlot) {
  if (slot.legs.length < 2) {
    slot.legs.push(newMatch(slot.legs[0].awayTeam.id, slot.legs[0].homeTeam.id));
  }
}

export function reverseSlotHomeField(slot: PlayoffRoundSlot) {
  for (const match of slot.legs) {
    [match.homeTeam, match.awayTeam] = [match.awayTeam, match.homeTeam];
  }
}

export function replaceSlotTeams(slot: PlayoffRoundSlot, teams: { home?: MatchTeam['id']; away?: MatchTeam['id'] }) {
  if (teams.home !== undefined) {
    slot.legs[0].homeTeam.id = teams.home;

    if (slot.legs[1]) {
      slot.legs[1].awayTeam.id = teams.home;
    }
  }

  if (teams.away !== undefined) {
    slot.legs[0].awayTeam.id = teams.away;

    if (slot.legs[1]) {
      slot.legs[1].homeTeam.id = teams.away;
    }
  }
}

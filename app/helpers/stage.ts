export function allTeamsAssigned(stage: TournamentStage) {
  if (stage.type === StageType.PLAYOFFS) {
    return false;
  }

  return stage.groups.every((g) => g.standings.every((s) => s.team !== null));
}

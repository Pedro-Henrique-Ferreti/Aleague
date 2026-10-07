export function replacePlayoffRoundTeams(round: PlayoffRound, form: StageSeedingForm) {
  for (const slot of round.slots) {
    const group = form.groups.find(g => g.slotId === slot.id);

    if (!group) return;

    const [homeTeam, awayTeam] = group.teams;

    slot.legs[0].homeTeam.id = homeTeam ?? null;
    slot.legs[0].awayTeam.id = awayTeam ?? null;

    if (slot.legs[1]) {
      slot.legs[1].homeTeam.id = awayTeam ?? null;
      slot.legs[1].awayTeam.id = homeTeam ?? null;
    }
  }
}

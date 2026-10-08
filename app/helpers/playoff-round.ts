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

export function moveTeamToNextRound(
  stage: PlayoffStage,
  params: { newWinner: PlayoffRoundSlotWinner; oldWinner: PlayoffRoundSlotWinner; slotIndex: number; roundIndex: number },
) {
  const { newWinner, oldWinner, slotIndex, roundIndex } = params;

  const nextRound = stage.rounds[roundIndex + 1];

  if (!nextRound) return;

  const slot = nextRound.slots[Math.floor(slotIndex / 2)];

  if (!slot) return;

  const isFirstMatchHomeTeam = slot.legs[0].homeTeam.id === oldWinner;

  if (isFirstMatchHomeTeam) {
    slot.legs[0].homeTeam.id = newWinner;
  } else {
    slot.legs[0].awayTeam.id = newWinner;
  }

  if (slot.legs[1]) {
    if (isFirstMatchHomeTeam) {
      slot.legs[1].awayTeam.id = newWinner;
    } else {
      slot.legs[1].homeTeam.id = newWinner;
    }
  }
}

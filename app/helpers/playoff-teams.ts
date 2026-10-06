export function replacePlayoffRoundTeams(stage: PlayoffStage, form: StageSeedingForm) {
  form.groups.forEach((group, index) => {
    const [home, away] = group.teams as [Team['id'], Team['id']];
    const { legs } = stage.rounds[0].slots[index]!;

    legs.forEach((_, index) => {
      legs[index]!.homeTeam.id = (index % 2 === 0) ? home : away;
      legs[index]!.awayTeam.id = (index % 2 === 0) ? away : home;
    });
  });
}
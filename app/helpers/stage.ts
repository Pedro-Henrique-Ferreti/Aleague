import { getGroupTeamsAndAvoidGroups, getSameGroupTeamLists } from './group-stage';
import { createMatchSchedule } from './match-schedule';
import { getPlayoffRoundNames, newPlayoffRoundSlot } from './playoff';
import { newStandingsEntry } from './standings';

export function groupsAreFullyCompleted(groups: GroupStage['groups']): boolean {
  return groups.every(g => g.standings.every(s => s.team !== null));
}

export function newPlayoffStage(stageForm: StageForm, baseStage: BaseStage): PlayoffStage {
  const roundNames = getPlayoffRoundNames(stageForm.playoffRounds, stageForm.teams);

  const newRound = (index: number): PlayoffRound => ({
    id: uuidv4(),
    order: index,
    name: roundNames[index]!,
    slots: createArray(stageForm.teams / 2 ** (index + 1), newPlayoffRoundSlot),
  });

  return {
    ...baseStage,
    type: StageType.PLAYOFF,
    rounds: createArray(stageForm.playoffRounds, newRound),
  };
}

export function newGroupStage(stageForm: StageForm, baseStage: BaseStage): GroupStage {
  return {
    ...baseStage,
    type: StageType.GROUP,
    matchweeks: [],
    groups: createArray(stageForm.groups, index => ({
      order: index + 1,
      qualifier: createArray(stageForm.teamsPerGroup, () => Qualifier.NONE),
      standings: createArray(stageForm.teamsPerGroup, () => newStandingsEntry()),
    })),
    overallQualifier: (
      (stageForm.groups > 1) ? createArray(stageForm.teamsPerGroup * stageForm.groups, () => Qualifier.NONE) : []
    ),
  };
}

export function newGroupStageMatchweekList(payload: {
  groups: GroupStage['groups'];
  format: GroupStageFormat;
  roundRobins: number;
  weeksToCreate?: number;
}): GroupStage['matchweeks'] {
  const { groups, format, roundRobins, weeksToCreate } = payload;

  if (!groupsAreFullyCompleted(groups)) throw new Error('All teams must be assigned');

  let schedule: MatchSchedule = [];

  if (format === GroupStageFormat.SAME_GROUP_ROUND_ROBIN) {
    const teamLists = getSameGroupTeamLists(groups);

    for (const teams of teamLists) {
      createMatchSchedule({
        teams,
        roundRobins,
        weeksToCreate,
      }).forEach((matches, i) => {
        if (!schedule[i]) {
          schedule[i] = [];
        }

        schedule[i]!.push(...matches);
      });
    }
  } else {
    const { teams, avoidGroups } = getGroupTeamsAndAvoidGroups(groups, format);

    schedule = createMatchSchedule({
      teams,
      roundRobins,
      avoidGroups,
      weeksToCreate,
    });
  }

  return schedule.map((matches, index) => ({
    week: index + 1,
    matches,
  }));
}

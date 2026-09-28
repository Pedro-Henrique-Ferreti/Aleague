import { getGroupTeamsAndAvoidGroups, getSameGroupTeamLists, isGroupStageSeeded } from './group-stage';
import { createMatchSchedule, type MatchScheduleResponse } from './match-schedule';

interface NewMatchweekListPayload {
  groups: GroupStage['groups'];
  format: GroupStageFormat;
  roundRobins: number;
  weeksToCreate?: number;
  signal?: AbortSignal;
}

export type NewMatchweekListResponse = Omit<MatchScheduleResponse, 'schedule'> & {
  matchweeks: GroupStage['matchweeks'];
};

export async function newMatchweekList(payload: NewMatchweekListPayload): Promise<NewMatchweekListResponse> {
  const { groups, format, roundRobins, weeksToCreate, signal } = payload;

  if (!isGroupStageSeeded(groups)) throw new Error('All teams must be assigned');

  let scheduleResult: MatchScheduleResponse = { schedule: [], isBalanced: true };

  if (format === GroupStageFormat.SAME_GROUP_ROUND_ROBIN) {
    const teamLists = getSameGroupTeamLists(groups);

    for (const teams of teamLists) {
      const { schedule } = await createMatchSchedule({
        teams,
        roundRobins,
        weeksToCreate,
        signal,
      });

      schedule.forEach((matches, i) => {
        scheduleResult.schedule[i] = [...(scheduleResult.schedule[i] ?? []), ...matches];
      });
    }
  } else {
    const { teams, avoidGroups } = getGroupTeamsAndAvoidGroups(groups, format);
    scheduleResult = await createMatchSchedule({
      teams,
      roundRobins,
      avoidGroups,
      weeksToCreate,
      signal,
    });
  }

  return {
    isBalanced: scheduleResult.isBalanced,
    matchweeks: scheduleResult.schedule.map((matches, index) => ({
      week: index + 1,
      matches,
    })),
  };
}

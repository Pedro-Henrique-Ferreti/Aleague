import { describe, expect, it } from 'vitest';
import { newMatchweekList } from '~/helpers/matchweek-list';

describe('matchweek-list', () => {
  describe('newMatchweekList', () => {
    it('should throw when groups are not fully completed', async () => {
      const groups = [{
        order: 1,
        standings: [
          { id: '1', team: 'team-a', data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
          { id: '2', team: null, data: [{ week: 1, type: TableEntryType.HOME, points: 0, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, form: [] }] },
        ] as StandingsEntry[],
        legend: [LegendColor.NONE, LegendColor.NONE],
      }];

      await expect(newMatchweekList({
        groups,
        format: GroupStageFormat.ALL_PLAY_ALL,
        roundRobins: 1,
      })).rejects.toThrow('All teams must be assigned');
    });
  });
});

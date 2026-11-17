import { type Day, setDay } from 'date-fns';

function kickoffTime(weekDay: Weekday, hours: number, minutes: number, weekStartsOn: Day = 0): MatchKickoff {
  return setDay(new Date(2025, 10, 8, hours, minutes), weekDay, { weekStartsOn }).toISOString();
}

export const KICKOFF_TIMES: Readonly<Record<MatchweekKickoff, Readonly<MatchKickoff[]>>> = {
  [MatchweekKickoff.WEEKDAY]: [
    kickoffTime(Weekday.TUESDAY, 21, 0),
    kickoffTime(Weekday.WEDNESDAY, 17, 0),
    kickoffTime(Weekday.WEDNESDAY, 19, 0),
    kickoffTime(Weekday.WEDNESDAY, 21, 0),
    kickoffTime(Weekday.THURSDAY, 19, 0),
    kickoffTime(Weekday.THURSDAY, 20, 0),
  ],
  [MatchweekKickoff.WEEKEND]: [
    kickoffTime(Weekday.SATURDAY, 16, 0, 6),
    kickoffTime(Weekday.SATURDAY, 18, 0, 6),
    kickoffTime(Weekday.SATURDAY, 20, 30, 6),
    kickoffTime(Weekday.SUNDAY, 16, 0, 6),
    kickoffTime(Weekday.SUNDAY, 18, 30, 6),
    kickoffTime(Weekday.SUNDAY, 20, 30, 6),
    kickoffTime(Weekday.MONDAY, 20, 0, 6),
  ],
};

export const MATCHWEEK_KICKOFF_OPTIONS: Readonly<SelectOptionList<MatchweekKickoff>> = [
  { label: 'Durante a semana', value: MatchweekKickoff.WEEKDAY },
  { label: 'Fim de semana', value: MatchweekKickoff.WEEKEND },
];

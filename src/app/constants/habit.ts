export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const REPEAT_DAYS: { label: string; value: number }[] = [
  { label: "ПН", value: DayOfWeek.Monday },
  { label: "ВТ", value: DayOfWeek.Tuesday },
  {
    label: "СР",
    value: DayOfWeek.Wednesday,
  },
  {
    label: "ЧT",
    value: DayOfWeek.Thursday,
  },
  {
    label: "ПТ",
    value: DayOfWeek.Friday,
  },
  {
    label: "СБ",
    value: DayOfWeek.Saturday,
  },
  {
    label: "ВС",
    value: DayOfWeek.Sunday,
  },
];

export const DEFAULT_HABIT_ITEM = {
  title: "",
  repeatDays: [],
  note: "",
};

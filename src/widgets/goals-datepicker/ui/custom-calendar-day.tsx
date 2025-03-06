import {
  cn,
  getAvailableGoalsVolumes,
  getCompletedGoalsVolumes,
  getStartOfDayTimestamp,
} from "@/app/lib/utils";
import { CircleProgress } from "@/shared/ui";
import { type HistoryGoalDto } from "@/shared/api";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isToday);

function CustomCalendarDay({
  date,
  displayMonth,
  history,
  onDayClick,
}: {
  date: Date;
  displayMonth: Date;
  history: { [key: string]: HistoryGoalDto[] } | undefined;
  onDayClick: (day: number) => void;
}) {
  const [searchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const normalizeDate = getStartOfDayTimestamp(
    dayjs(date).subtract(new Date().getTimezoneOffset(), "minute").valueOf(),
  );

  const goals = history?.[String(normalizeDate)] || [];

  const { availableHabitsCount, availableTasksCount } =
    getAvailableGoalsVolumes(goals);

  const { completedHabitsCount, completedTasksCount } =
    getCompletedGoalsVolumes(goals, normalizeDate);

  const progress =
    ((completedHabitsCount + completedTasksCount) /
      (availableHabitsCount + availableTasksCount) || 0) * 100;

  const active = dayjs(normalizeDate).isToday();

  const selected = historyDate ? Number(historyDate) === normalizeDate : active;

  return (
    <CircleProgress progress={progress}>
      <span
        aria-selected={selected}
        data-active={active}
        className={cn("goal-calendar-day", {
          ["goal-calendar-outside-day"]:
            displayMonth.getMonth() !== date.getMonth(),
          ["hover:text-green-500 text-green-500"]: active,
        })}
        onClick={() => onDayClick(normalizeDate)}
      >
        {date.getDate()}
      </span>
    </CircleProgress>
  );
}

export { CustomCalendarDay };

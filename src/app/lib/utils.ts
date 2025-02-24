import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { GoalDto, HabitEntity, HistoryGoalDto, TaskEntity } from "@/shared/api";
import "dayjs/locale/ru";

dayjs.locale("ru");
dayjs.extend(utc);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function declension(value: number, words: string[]) {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num == 1) return words[0];
  return words[2];
}

export function formatTimestampDaysUntilDeadline(timestamp: number) {
  const deadlineDate = dayjs(timestamp);

  const currentDay = dayjs(getStartOfDayTimestamp());

  const days = deadlineDate.diff(currentDay, "day");

  if (days < 0) {
    return `Цель просрочена на ${Math.abs(days)} ${declension(Math.abs(days), ["день", "дня", "дней"])}`;
  }

  return `Осталось ${days} ${declension(days, ["день", "дня", "дней"])}`;
}

export function formatTimestampRuLocale(timestamp: number) {
  return dayjs(timestamp).format("ddd, MMM D, YYYY");
}

export const getStartOfDayTimestamp = (date?: number): number => {
  if (date) return dayjs.utc(date).startOf("day").valueOf();

  return dayjs.utc().startOf("day").valueOf();
};

export const isDoneHabit = (habit: HabitEntity, targetTimestamp?: number) =>
  habit?.doneDays?.some(
    (timestamp) => timestamp === getStartOfDayTimestamp(targetTimestamp),
  );

export function getCompletedHabitsCount(
  habits: HabitEntity[],
  timestamp?: number,
) {
  if (!habits.length) return 0;

  let count = 0;

  habits.forEach((habit) => {
    habit?.doneDays?.forEach((dayTimestamp) => {
      if (dayTimestamp === getStartOfDayTimestamp(timestamp)) {
        count += 1;
      }
    });
  });

  return count;
}

export function getCompletedTasksCount(tasks: TaskEntity[]) {
  if (!tasks.length) return 0;

  let count = 0;

  tasks.forEach((task) => {
    if (task?.done) {
      count += 1;
    }
  });

  return count;
}

export const isAvailableHabit = (habit: HabitEntity, targetDay: number) =>
  habit?.repeatDays?.some((day) => targetDay === day);

export const isAvailableTask = (task: TaskEntity, targetDay?: number) =>
  !task.done ||
  (task.done && task?.doneTimestamp === getStartOfDayTimestamp(targetDay));

export const getAvailableHabits = (
  habits: HabitEntity[] | undefined,
  targetDay: number,
) => habits?.filter((habit) => isAvailableHabit(habit, targetDay));

export const getAvailableTasks = (
  tasks: TaskEntity[] | undefined,
  targetDay?: number,
) => tasks?.filter((task) => isAvailableTask(task, targetDay));

export function getCompletedGoalsVolumes(
  goals: (GoalDto | HistoryGoalDto)[],
  timestamp?: number,
) {
  const completedHabitsCount = goals.reduce(
    (acc, element) =>
      acc + getCompletedHabitsCount(element?.habits || [], timestamp),
    0,
  );

  const completedTasksCount = goals.reduce(
    (acc, element) => acc + getCompletedTasksCount(element?.tasks || []),
    0,
  );

  return { completedHabitsCount, completedTasksCount };
}

export function getAvailableGoalsVolumes(goals: (GoalDto | HistoryGoalDto)[]) {
  const availableHabitsCount = goals.reduce(
    (acc, element) => acc + (element?.habits?.length || 0),
    0,
  );

  const availableTasksCount = goals.reduce(
    (acc, element) => acc + (element?.tasks?.length || 0),
    0,
  );

  return { availableHabitsCount, availableTasksCount };
}

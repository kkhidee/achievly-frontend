export const DEFAULT_THEME = "dark";
export const THEME_STORAGE_KEY = "theme-key";

export const ZOD_ERROR = {
  required_error: "Обязательное поле",
  invalid_type_error: "Введите корректное значение",
};

export enum RoutesEnum {
  Home = "/",
  Auth = "/auth",
  GoalsDashboard = "/goals/dashboard",
  GoalsCalendar = "/goals/calendar",
  GoalsPublic = "/goals/public",
  GoalsStatistics = "/goals/statistics",
}

export const ROUTES_TITLE: Record<string, string> = {
  [RoutesEnum.Home]: "Главная",
  [RoutesEnum.GoalsDashboard]: "Дашборд",
  [RoutesEnum.GoalsCalendar]: "Календарь",
  [RoutesEnum.GoalsPublic]: "Публичные цели",
  [RoutesEnum.GoalsStatistics]: "Статистика",
} as const;

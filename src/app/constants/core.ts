import {
  ChartNoAxesCombined,
  Compass,
  House,
  LayoutGrid,
  User,
} from "lucide-react";

export const DEFAULT_THEME = "dark";
export const THEME_STORAGE_KEY = "theme-key";

export const ZOD_ERROR = {
  required_error: "Обязательное поле",
  invalid_type_error: "Введите корректное значение",
};

export enum RoutesEnum {
  Home = "/",
  Auth = "/auth",
  Explore = "/explore",
  Statistics = "/statistics",
  Goals = "/goals",
  Profile = "/profile",
  GoalCreate = "/goal-create",
}

export const PAGE_TITLE: Record<string, string> = {
  [RoutesEnum.Home]: "Главная",
  [RoutesEnum.Explore]: "Обзор",
  [RoutesEnum.Statistics]: "Статистика",
  [RoutesEnum.Goals]: "Цели",
  [RoutesEnum.Profile]: "Профиль",
};

export const FOOTER_LINKS = [
  { id: "home", title: "Главная", url: RoutesEnum.Home, icon: House },
  { id: "explore", title: "Обзор", url: RoutesEnum.Explore, icon: Compass },
  {
    id: "statistics",
    title: "Статистика",
    url: RoutesEnum.Statistics,
    icon: ChartNoAxesCombined,
  },
  {
    id: "goals",
    title: "Цели",
    url: RoutesEnum.Goals,
    icon: LayoutGrid,
  },
  {
    id: "profile",
    title: "Профиль",
    url: RoutesEnum.Profile,
    icon: User,
  },
];

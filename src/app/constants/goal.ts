import { GoalDtoCategoryEnum, GoalDtoTypeEnum } from "@/shared/api";
import {
  BicepsFlexed,
  BriefcaseBusiness,
  Church,
  Drum,
  GraduationCap,
  HandHeart,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Image,
  Palette,
  Plane,
  SmilePlus,
  Trees,
  TrendingUp,
  Wallet,
} from "lucide-react";

export const GoalCategoryIconEnum = {
  [GoalDtoCategoryEnum.education]: GraduationCap,
  [GoalDtoCategoryEnum.career]: BriefcaseBusiness,
  [GoalDtoCategoryEnum.finance]: Wallet,
  [GoalDtoCategoryEnum.health]: HeartPulse,
  [GoalDtoCategoryEnum.sports]: BicepsFlexed,
  [GoalDtoCategoryEnum.relationships]: HandHeart,
  [GoalDtoCategoryEnum.travel]: Plane,
  [GoalDtoCategoryEnum.creativity]: Palette,
  [GoalDtoCategoryEnum.business]: Handshake,
  [GoalDtoCategoryEnum.personalGrowth]: TrendingUp,
  [GoalDtoCategoryEnum.charity]: HeartHandshake,
  [GoalDtoCategoryEnum.hobby]: Drum,
  [GoalDtoCategoryEnum.spirituality]: Church,
  [GoalDtoCategoryEnum.ecology]: Trees,
  [GoalDtoCategoryEnum.socialActivity]: SmilePlus,
  default: Image,
};

export const DEFAULT_HEADER_FORM_VALUES = {
  title: "",
  type: GoalDtoTypeEnum.private,
  category: undefined,
  deadlineTimestamp: undefined,
};

export enum GoalPersonalType {
  Create = "create",
  Edit = "edit",
  View = "view",
}

export const GOAL_CATEGORY: Record<GoalDtoCategoryEnum, string> = {
  education: "Обучение",
  career: "Карьера",
  finance: "Финансы",
  health: "Здоровье",
  sports: "Спорт",
  relationships: "Отношения",
  travel: "Путешествия",
  creativity: "Творчество",
  business: "Бизнес",
  personalGrowth: "Личностный рост",
  charity: "Благотворительность",
  hobby: "Хобби",
  spirituality: "Духовность",
  ecology: "Экология",
  socialActivity: "Социальная активность",
};

export const GOAL_TYPE: Record<GoalDtoTypeEnum, string> = {
  private: "Приватный",
  public: "Публичный",
};

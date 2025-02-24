import { GoalCategoryIconEnum } from "@/app/constants/goal";
import { GoalDtoCategoryEnum } from "@/shared/api";

type GoalCategoryIconProps = {
  category: GoalDtoCategoryEnum | "default";
  size?: number;
};

export function GoalCategoryIcon({ category, size }: GoalCategoryIconProps) {
  const Component = GoalCategoryIconEnum[category || "default"];

  return <Component size={size || 64} />;
}

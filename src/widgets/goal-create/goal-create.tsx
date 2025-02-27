import { useGoalCreateQueries } from "@/widgets/goal-create/api/use-queries";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { GoalCreateDrawerWrapper } from "@/widgets/goal-create/ui/drawer-wrapper";
import { GoalCreateSheetWrapper } from "@/widgets/goal-create/ui/sheet-wrapper";
import { GoalDto } from "@/shared/api";
import { PlusIcon } from "lucide-react";

export function GoalCreate() {
  const isMobile = useIsMobile();

  const { createGoal, isCreatePending } = useGoalCreateQueries();

  const onCreate = async (values: GoalDto) => {
    await createGoal({ data: values });
  };

  return isMobile ? (
    <GoalCreateDrawerWrapper
      isCreatePending={isCreatePending}
      onCreate={onCreate}
    >
      <div className="mr-4 flex h-9 items-center justify-center gap-x-2 rounded-full bg-secondary p-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 md:px-4 [&_svg]:size-4 [&_svg]:shrink-0">
        <PlusIcon className="text-current" />
        <span className="text-xs md:text-sm">Создать цель</span>
      </div>
    </GoalCreateDrawerWrapper>
  ) : (
    <GoalCreateSheetWrapper
      isCreatePending={isCreatePending}
      onCreate={onCreate}
    >
      <div className="absolute right-4 top-4 flex h-9 items-center justify-center gap-x-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 [&_svg]:size-4 [&_svg]:shrink-0">
        <PlusIcon className="text-current" />
        <span>Создать цель</span>
      </div>
    </GoalCreateSheetWrapper>
  );
}

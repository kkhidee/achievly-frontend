import { GoalCard, Skeleton } from "@/shared/ui";
import { GoalDto, GoalDtoTypeEnum } from "@/shared/api";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { GoalAchievedDrawerWrapper } from "@/widgets/goals-achieved/ui/drawer-wrapper";
import { GoalAchievedSheetWrapper } from "@/widgets/goals-achieved/ui/sheet-wrapper";
import { useGoalsAchievedQueries } from "@/widgets/goals-achieved/api/use-queries";

function GoalsAchieved() {
  const isMobile = useIsMobile();

  const {
    goals,
    isGoalsLoading,
    updateGoal,
    isUpdatePending,
    deleteGoal,
    isDeletePending,
  } = useGoalsAchievedQueries();

  const onToggleType = async (goal: GoalDto) => {
    if (goal) {
      await updateGoal({
        id: String(goal.id),
        data: {
          ...goal,
          type:
            goal?.type === GoalDtoTypeEnum.private
              ? GoalDtoTypeEnum.public
              : GoalDtoTypeEnum.private,
        },
      });
    }
  };

  const onDelete = async (id: number) => {
    if (id) {
      await deleteGoal({ id: String(id) });
    }
  };

  if (isGoalsLoading) {
    return <Skeleton className="size-full rounded-xl" />;
  }

  return (
    <div className="flex flex-col gap-y-3">
      {...(goals || [])?.map((goal) =>
        isMobile ? (
          <GoalAchievedDrawerWrapper
            key={goal.id}
            goal={goal}
            isUpdatePending={isUpdatePending}
            isDeletePending={isDeletePending}
            onToggleType={onToggleType}
            onDelete={onDelete}
          >
            <GoalCard key={goal.id} goal={goal} completedView />
          </GoalAchievedDrawerWrapper>
        ) : (
          <GoalAchievedSheetWrapper
            key={goal.id}
            goal={goal}
            isUpdatePending={isUpdatePending}
            isDeletePending={isDeletePending}
            onToggleType={onToggleType}
            onDelete={onDelete}
          >
            <GoalCard goal={goal} completedView />
          </GoalAchievedSheetWrapper>
        ),
      )}
    </div>
  );
}

export { GoalsAchieved };

import { GoalCard, Skeleton } from "@/shared/ui";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { GoalOngoingSheetWrapper } from "@/widgets/goals-ongoing/ui/sheet-wrapper";
import { GoalOngoingDrawerWrapper } from "@/widgets/goals-ongoing/ui/drawer-wrapper";
import { useGoalsOngoingQueries } from "@/widgets/goals-ongoing/api/use-queries";
import { GoalDto } from "@/shared/api";

function GoalsOngoing() {
  const isMobile = useIsMobile();

  const {
    goals,
    isGoalsLoading,
    updateGoal,
    isUpdatePending,
    achieveGoal,
    isAchievePending,
    deleteGoal,
    isDeletePending,
  } = useGoalsOngoingQueries();

  const onUpdate = async (values: GoalDto) => {
    if (values.id) {
      await updateGoal({ id: String(values.id), data: values });
    }
  };

  const onAchieve = async (id: number) => {
    if (id) {
      await achieveGoal({ id: String(id) });
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
          <GoalOngoingDrawerWrapper
            key={goal.id}
            goal={goal}
            isUpdatePending={isUpdatePending}
            isAchievePending={isAchievePending}
            isDeletePending={isDeletePending}
            onUpdate={onUpdate}
            onAchieve={onAchieve}
            onDelete={onDelete}
          >
            <GoalCard goal={goal} completedView />
          </GoalOngoingDrawerWrapper>
        ) : (
          <GoalOngoingSheetWrapper
            key={goal.id}
            goal={goal}
            isUpdatePending={isUpdatePending}
            isAchievePending={isAchievePending}
            isDeletePending={isDeletePending}
            onUpdate={onUpdate}
            onAchieve={onAchieve}
            onDelete={onDelete}
          >
            <GoalCard goal={goal} completedView />
          </GoalOngoingSheetWrapper>
        ),
      )}
    </div>
  );
}

export { GoalsOngoing };

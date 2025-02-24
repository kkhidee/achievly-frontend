import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { GoalDto, GoalDtoTypeEnum } from "@/shared/api";
import { GoalPersonalType } from "@/app/constants/goal";
import { GoalPersonalCreate } from "@/entities/goal-personal/ui/create";
import { GoalPersonalEdit } from "@/entities/goal-personal/ui/edit";
import { useGoalPersonalQueries } from "@/entities/goal-personal/hooks/use-queries";
import { Loader } from "@/shared/ui";
import { GoalPersonalView } from "@/entities/goal-personal/ui/view";

export function GoalPersonal() {
  const { id } = useParams<{ id: string }>();

  const {
    goal,
    createGoal,
    updateGoal,
    achieveGoal,
    deleteGoal,
    isGoalLoading,
    isCreatePending,
    isUpdatePending,
    isAchievePending,
    isDeletePending,
  } = useGoalPersonalQueries();

  const navigate = useNavigate();

  const type = useMemo(() => {
    if (goal?.achievedTimestamp) return GoalPersonalType.View;

    if (id) return GoalPersonalType.Edit;

    return GoalPersonalType.Create;
  }, [goal?.achievedTimestamp, id]);

  const onCreate = (values: GoalDto) => {
    createGoal({ data: values });
  };

  const onUpdate = async (values: GoalDto) => {
    if (id) {
      await updateGoal({ id, data: values });
      navigate(-1);
    }
  };

  const onAchieve = () => {
    if (id) {
      achieveGoal({ id });
    }
  };

  const onDelete = () => {
    if (id) {
      deleteGoal({ id });
    }
  };

  const onToggleType = async () => {
    if (id && goal) {
      await updateGoal({
        id,
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

  if (isGoalLoading) return <Loader />;

  return (
    <>
      {type === GoalPersonalType.Create && (
        <GoalPersonalCreate
          isCreatePending={isCreatePending}
          onCreate={onCreate}
        />
      )}

      {type === GoalPersonalType.Edit && goal && (
        <GoalPersonalEdit
          goal={goal}
          isUpdatePending={isUpdatePending}
          isAchievePending={isAchievePending}
          isDeletePending={isDeletePending}
          onUpdate={onUpdate}
          onAchieve={onAchieve}
          onDelete={onDelete}
        />
      )}

      {type === GoalPersonalType.View && goal && (
        <GoalPersonalView
          goal={goal}
          isDeletePending={isDeletePending}
          onDelete={onDelete}
          onToggleType={onToggleType}
        />
      )}
    </>
  );
}

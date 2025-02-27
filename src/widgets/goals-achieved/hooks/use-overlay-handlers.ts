import { UseFormReturn } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { GoalDto } from "@/shared/api";
import { Dispatch, SetStateAction } from "react";

type useGoalsAchievedOverlayHandlersProps = {
  goal: GoalDto;
  form: UseFormReturn<GoalDto>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onToggleType: (goal: GoalDto) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export const useGoalsAchievedOverlayHandlers = ({
  goal,
  form,
  setOpen,
  onToggleType,
  onDelete,
}: useGoalsAchievedOverlayHandlersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetQuery = () => {
    searchParams.set("goal-id", String(goal.id));
    setSearchParams(searchParams);
  };

  const handleDeleteQuery = () => {
    searchParams.delete("goal-id");
    setSearchParams(searchParams);
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) {
      handleSetQuery();
      form.setValue("title", goal.title);
      form.setValue("category", goal.category);
      form.setValue("type", goal.type);
      form.setValue("deadlineTimestamp", goal.deadlineTimestamp);
      form.setValue("habits", goal.habits);
      form.setValue("tasks", goal.tasks);
      form.setValue("note", goal.note);
    } else {
      handleDeleteQuery();
      form.reset();
    }
  };

  const handleToggleType = () => {
    form.trigger().then(async (valid) => {
      if (valid) {
        await onToggleType(goal);
        handleDeleteQuery();
        setOpen(false);
      }
    });
  };

  const handleDelete = async () => {
    await onDelete(goal.id);
    handleDeleteQuery();
    setOpen(false);
  };

  return {
    handleSetQuery,
    handleOpenChange,
    handleToggleType,
    handleDelete,
  };
};

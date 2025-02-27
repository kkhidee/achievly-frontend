import { UseFormReturn } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { GoalDto } from "@/shared/api";
import { Dispatch, SetStateAction } from "react";

type UseGoalsOngoingOverlayHandlersProps = {
  goal: GoalDto;
  form: UseFormReturn<GoalDto>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onUpdate: (values: GoalDto) => Promise<void>;
  onAchieve: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export const useGoalsOngoingOverlayHandlers = ({
  goal,
  form,
  setOpen,
  onUpdate,
  onAchieve,
  onDelete,
}: UseGoalsOngoingOverlayHandlersProps) => {
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

  const handleUpdate = () => {
    form.trigger().then(async (valid) => {
      if (valid) {
        await onUpdate(form.getValues());
        handleDeleteQuery();
        setOpen(false);
      }
    });
  };

  const handleAchieve = async () => {
    await onAchieve(goal.id);
    handleDeleteQuery();
    setOpen(false);
    form.reset();
  };

  const handleDelete = async () => {
    await onDelete(goal.id);
    handleDeleteQuery();
    setOpen(false);
    form.reset();
  };

  return {
    handleSetQuery,
    handleOpenChange,
    handleUpdate,
    handleAchieve,
    handleDelete,
  };
};

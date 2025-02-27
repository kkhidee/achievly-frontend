import { UseFormReturn } from "react-hook-form";
import { GoalDto } from "@/shared/api";
import { Dispatch, SetStateAction } from "react";

type useGoalCreateOverlayHandlersProps = {
  form: UseFormReturn<GoalDto>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onCreate: (values: GoalDto) => Promise<void>;
};

export const useGoalCreateOverlayHandlers = ({
  form,
  setOpen,
  onCreate,
}: useGoalCreateOverlayHandlersProps) => {
  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (!value) {
      form.setValue("deadlineTimestamp", null);
      form.reset();
    }
  };

  const handleCreate = () => {
    form.trigger().then(async (valid) => {
      if (valid) {
        await onCreate(form.getValues());
        handleOpenChange(false);
      }
    });
  };

  return {
    handleCreate,
    handleOpenChange,
  };
};

import { useGoalCreateQueries } from "@/widgets/goal-create/api/use-queries";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { GoalCreateDrawerWrapper } from "@/widgets/goal-create/ui/drawer-wrapper";
import { GoalCreateSheetWrapper } from "@/widgets/goal-create/ui/sheet-wrapper";
import { GoalDto } from "@/shared/api";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DEFAULT_GOAL_FORM_VALUES } from "@/app/constants/goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoalDtoSchema } from "@/shared/zod";

export function GoalCreate() {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<GoalDto>({
    defaultValues: DEFAULT_GOAL_FORM_VALUES,
    resolver: zodResolver(createGoalDtoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { createGoal, isCreatePending } = useGoalCreateQueries();

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
        await createGoal({ data: form.getValues() });
        handleOpenChange(false);
      }
    });
  };

  return (
    <FormProvider {...form}>
      {isMobile ? (
        <GoalCreateDrawerWrapper
          open={open}
          isPending={isCreatePending}
          handleOpenChange={handleOpenChange}
          handleCreate={handleCreate}
        />
      ) : (
        <GoalCreateSheetWrapper
          open={open}
          isPending={isCreatePending}
          handleOpenChange={handleOpenChange}
          handleCreate={handleCreate}
        />
      )}
    </FormProvider>
  );
}

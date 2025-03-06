import { FormProvider, useForm } from "react-hook-form";
import { GoalDto, goalDtoSchema } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";

type GoalsOverviewItem = {
  goal: Pick<GoalDto, "habits" | "tasks" | "id">;
};

function GoalsOverviewForm({ goal }: GoalsOverviewItem) {
  const form = useForm<Pick<GoalDto, "habits" | "tasks" | "id">>({
    values: goal,
    resolver: zodResolver(goalDtoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <FormProvider {...form}>
      <HabitsList completeOnly />
      <TasksList completeOnly />
    </FormProvider>
  );
}

export { GoalsOverviewForm };

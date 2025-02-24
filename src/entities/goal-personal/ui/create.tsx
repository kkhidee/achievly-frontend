import {
  Badge,
  Button,
  CircleLoader,
  GoalFooter,
  GoalPreview,
  NoteField,
} from "@/shared/ui";
import { GoalHeader } from "@/features/goal-header";
import { HabitList } from "@/features/habit-list";
import { TaskList } from "@/features/task-list";
import { GoalDto } from "@/shared/api";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoalDtoSchema } from "@/shared/zod";

type GoalPersonalCreateProps = {
  isCreatePending: boolean;
  onCreate: (values: GoalDto) => void;
};

export function GoalPersonalCreate({
  isCreatePending,
  onCreate,
}: GoalPersonalCreateProps) {
  const form = useForm<GoalDto>({
    resolver: zodResolver(createGoalDtoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { habits, tasks } = useWatch({ control: form.control });

  return (
    <FormProvider {...form}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <GoalPreview />
          <GoalHeader />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2">
              <h3 className="text-base font-medium sm:text-lg">Привычки</h3>
              <Badge className="flex size-[28px] items-center justify-center rounded-full">
                {habits?.length || 0}
              </Badge>
            </div>
            <HabitList />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2">
              <h3 className="text-base font-medium sm:text-lg">Задачи</h3>
              <Badge className="flex size-[28px] items-center justify-center rounded-full">
                {tasks?.length || 0}
              </Badge>
            </div>
            <TaskList />
          </div>

          <NoteField
            control={form.control}
            className="p-4"
            label="Примечание"
          />
        </div>
        <GoalFooter>
          <Button
            className="w-full"
            onClick={() => onCreate(form.getValues())}
            disabled={isCreatePending || !form.formState.isValid}
          >
            {isCreatePending ? <CircleLoader /> : "Создать цель"}
          </Button>
        </GoalFooter>
      </div>
    </FormProvider>
  );
}

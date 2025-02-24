import {
  Badge,
  Button,
  CircleLoader,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  GoalFooter,
  GoalPreview,
  NoteField,
} from "@/shared/ui";
import { GoalHeader } from "@/features/goal-header";
import { HabitList } from "@/features/habit-list";
import { TaskList } from "@/features/task-list";
import { GoalDto, goalDtoSchema } from "@/shared/api";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type GoalPersonalEditProps = {
  goal: GoalDto;
  isUpdatePending: boolean;
  isAchievePending: boolean;
  isDeletePending: boolean;
  onUpdate: (values: GoalDto) => void;
  onAchieve: () => void;
  onDelete: () => void;
};

export function GoalPersonalEdit({
  goal,
  isUpdatePending,
  isAchievePending,
  isDeletePending,
  onUpdate,
  onAchieve,
  onDelete,
}: GoalPersonalEditProps) {
  const form = useForm<GoalDto>({
    defaultValues: { ...goal },
    resolver: zodResolver(goalDtoSchema),
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
          <div className="flex w-full flex-col gap-2">
            {form.formState.isDirty ? (
              <Button
                className="w-full"
                onClick={() => onUpdate(form.getValues())}
                disabled={isUpdatePending || !form.formState.isValid}
              >
                {isUpdatePending ? <CircleLoader /> : "Обновить данные цели"}
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={onAchieve}
                disabled={isAchievePending || !form.formState.isValid}
              >
                {isAchievePending ? <CircleLoader /> : "Завершить цель"}
              </Button>
            )}

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-600 hover:bg-red-600"
                >
                  Удалить цель
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Вы точно хотите удалить цель?</DialogTitle>
                  <DialogDescription>
                    После удаления цель невозможно будет восстановить
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Отменить
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isDeletePending}
                  >
                    {isDeletePending ? <CircleLoader /> : "Удалить"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </GoalFooter>
      </div>
    </FormProvider>
  );
}

import {
  Button,
  CircleLoader,
  DeadlineTimestampField,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  NoteField,
  TitleField,
} from "@/shared/ui";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  getAllHistoryQueryKey,
  getGoalQueryKey,
  getGoalsQueryKey,
  getStatisticsQueryKey,
  GoalDtoStatusEnum,
  TaskEntity,
  useToggleTaskComplete,
} from "@/shared/api";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

type TaskDrawerProps = {
  open: boolean;
  index: number;
  title?: string;
  readOnly?: boolean;
  onSave: (index: number) => void;
  onDrawerClose: () => void;
};

type TaskViewDrawerProps = {
  goalId: number | undefined;
  task: TaskEntity | undefined;
  open: boolean;
  readOnly?: boolean;
  onDrawerClose: () => void;
};

function TaskDrawer({
  index,
  open,
  title,
  readOnly,
  onSave,
  onDrawerClose,
}: TaskDrawerProps) {
  const { control, reset } = useFormContext();

  const handleSave = () => {
    onSave(index);
  };

  const handleCancel = () => {
    reset();
  };

  const handleOpenChange = () => {
    onDrawerClose();
    reset();
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {readOnly ? "Задача" : title}
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {readOnly
                ? "Вы можете просмотреть информацию о задаче"
                : "Заполните поля, чтобы продолжить"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-y-4 px-4 py-6">
            <TitleField
              control={control}
              disabled={readOnly}
              label="Заголовок задачи"
            />
            <DeadlineTimestampField
              control={control}
              disabled={readOnly}
              label="Дата завершения задачи"
            />
            <NoteField
              control={control}
              disabled={readOnly}
              label="Примечание"
            />
          </div>
          <DrawerFooter className="flex items-center justify-between gap-3">
            {!readOnly && (
              <Button type="button" className="w-full" onClick={handleSave}>
                Сохранить
              </Button>
            )}
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCancel}
              >
                {readOnly ? "Закрыть" : "Отменить"}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function TaskViewDrawer({
  goalId,
  task,
  open,
  readOnly,
  onDrawerClose,
}: TaskViewDrawerProps) {
  const queryClient = useQueryClient();

  const form = useForm({ values: task });

  const { mutate, isPending } = useToggleTaskComplete({
    mutation: {
      onSuccess: () => {
        if (goalId) {
          queryClient
            .invalidateQueries({
              queryKey: getGoalQueryKey({ id: String(goalId) }),
            })
            .then();
        }

        queryClient
          .invalidateQueries({
            queryKey: getGoalsQueryKey({ status: GoalDtoStatusEnum.ongoing }),
          })
          .then();

        queryClient
          .invalidateQueries({
            queryKey: getAllHistoryQueryKey(),
          })
          .then();

        queryClient
          .invalidateQueries({
            queryKey: getStatisticsQueryKey({
              period: [
                dayjs().weekday(0).format("YYYY-MM-DD"),
                dayjs().weekday(6).format("YYYY-MM-DD"),
              ],
            }),
          })
          .then();

        onDrawerClose();
      },
    },
  });

  const isDone = task?.done ?? false;

  const handleToggleDone = () => {
    if (task && goalId !== undefined) {
      mutate({
        id: String(goalId),
        taskId: task.id,
      });
      form.reset();
    }
  };

  const handleOpenChange = () => {
    onDrawerClose();
    form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <FormProvider {...form}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-center">Задача</DrawerTitle>
              <DrawerDescription className="text-center">
                Вы можете просмотреть информацию о задаче
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-y-4 px-4 py-6">
              <TitleField
                disabled
                control={form.control}
                label="Заголовок задачи"
              />
              <DeadlineTimestampField
                disabled
                control={form.control}
                label="Дата завершения задачи"
              />
              <NoteField disabled control={form.control} label="Примечание" />
            </div>
            {!readOnly && (
              <DrawerFooter className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleToggleDone}
                >
                  {isPending ? (
                    <CircleLoader />
                  ) : isDone ? (
                    "Отметить как невыполненное"
                  ) : (
                    "Отметить как выполненное"
                  )}
                </Button>
              </DrawerFooter>
            )}
          </div>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}

export { TaskDrawer, TaskViewDrawer };

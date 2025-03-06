import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import {
  getAllHistoryQueryKey,
  getGoalsQueryKey,
  getStatisticsQueryKey,
  GoalDto,
  GoalDtoStatusEnum,
  useToggleTaskComplete,
} from "@/shared/api";
import { v4 as uuid } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "@/shared/zod";
import { DEFAULT_TASK_ITEM } from "@/app/constants/task";
import { TaskCard } from "@/shared/ui";
import { PlusIcon } from "lucide-react";
import { TaskFormSchema } from "@/shared/zod/taskFormSchema";
import { EmptyState } from "@/shared/ui/empty-state";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { TasksListDrawerWrapper } from "@/features/tasks-list/ui/drawer-wrapper";
import { TasksListSheetWrapper } from "@/features/tasks-list/ui/sheet-wrapper";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

type TaskListProps = {
  readOnly?: boolean;
  completeOnly?: boolean;
};

export function TasksList({ readOnly, completeOnly }: TaskListProps) {
  const isMobile = useIsMobile();

  const { control, trigger, getValues } = useFormContext<GoalDto>();

  const queryClient = useQueryClient();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const { mutateAsync } = useToggleTaskComplete({
    mutation: {
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: getGoalsQueryKey({
              status: GoalDtoStatusEnum.ongoing,
            }),
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
      },
    },
  });

  const taskForm = useForm<TaskFormSchema>({
    defaultValues: DEFAULT_TASK_ITEM,
    resolver: zodResolver(taskFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSave = (index: number) => {
    taskForm.trigger().then((valid) => {
      if (valid) {
        const values = taskForm.getValues();

        if (index !== fields.length) {
          update(index, { ...fields[index], ...values });
        } else {
          append({ ...values, id: uuid(), done: false });
        }

        taskForm.reset();
      }
    });

    trigger().then();
  };

  const onToggleComplete = async (index: number) => {
    const id = getValues()?.id;

    const taskId = getValues()?.tasks?.[index]?.id;

    if (taskId) await mutateAsync({ id: String(id), taskId });
  };

  const onTriggerClick = (index: number) => {
    taskForm.setValue("title", fields[index]?.title);
    taskForm.setValue("note", fields[index]?.note || "");
    taskForm.setValue(
      "deadlineTimestamp",
      fields[index]?.deadlineTimestamp || undefined,
    );
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <EmptyState
        text="Задачи отсутствуют"
        condition={Boolean(!(fields?.length || 0) && readOnly)}
      />

      {(fields || []).map((field, index) => (
        <FormProvider key={field.id} {...taskForm}>
          {isMobile ? (
            <TasksListDrawerWrapper
              index={index}
              task={field}
              readOnly={readOnly}
              completeOnly={completeOnly}
              title={readOnly || completeOnly ? "Задача" : "Изменить задачу"}
              onSave={onSave}
              onTriggerClick={onTriggerClick}
              onToggleComplete={onToggleComplete}
            >
              <TaskCard
                task={field}
                onDelete={
                  !readOnly && !completeOnly ? () => remove(index) : undefined
                }
              />
            </TasksListDrawerWrapper>
          ) : (
            <TasksListSheetWrapper
              index={index}
              task={field}
              readOnly={readOnly}
              completeOnly={completeOnly}
              title={readOnly || completeOnly ? "Задача" : "Изменить задачу"}
              onSave={onSave}
              onTriggerClick={onTriggerClick}
              onToggleComplete={onToggleComplete}
            >
              <TaskCard
                task={field}
                onDelete={
                  !readOnly && !completeOnly ? () => remove(index) : undefined
                }
              />
            </TasksListSheetWrapper>
          )}
        </FormProvider>
      ))}

      {!readOnly && !completeOnly && (
        <FormProvider {...taskForm}>
          {isMobile ? (
            <TasksListDrawerWrapper
              index={fields.length}
              title="Добавить задачу"
              onSave={onSave}
              onTriggerClick={onTriggerClick}
            >
              <div className="flex h-9 items-center justify-center gap-x-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 [&_svg]:size-4 [&_svg]:shrink-0">
                <PlusIcon className="text-current" />
                <span>Добавить задачу</span>
              </div>
            </TasksListDrawerWrapper>
          ) : (
            <TasksListSheetWrapper
              index={fields.length}
              title="Добавить задачу"
              onSave={onSave}
              onTriggerClick={onTriggerClick}
            >
              <div className="flex h-9 items-center justify-center gap-x-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 [&_svg]:size-4 [&_svg]:shrink-0">
                <PlusIcon className="text-current" />
                <span>Добавить задачу</span>
              </div>
            </TasksListSheetWrapper>
          )}
        </FormProvider>
      )}
    </div>
  );
}

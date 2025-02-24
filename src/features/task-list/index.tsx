import { useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { GoalDto } from "@/shared/api";
import { v4 as uuid } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema } from "@/shared/zod";
import { DEFAULT_TASK_ITEM } from "@/app/constants/task";
import { Button, TaskCard } from "@/shared/ui";
import { PlusIcon } from "lucide-react";
import { TaskDrawer } from "@/shared/ui/task-drawer";
import { TaskFormSchema } from "@/shared/zod/taskFormSchema";
import { EmptyState } from "@/shared/ui/empty-state";

type TaskListProps = {
  readOnly?: boolean;
};

export function TaskList({ readOnly }: TaskListProps) {
  const [openTaskIndex, setOpenTaskIndex] = useState<number>();

  const [openTaskDrawer, setOpenTaskDrawer] = useState<boolean>(false);

  const { control, trigger } = useFormContext<GoalDto>();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const drawerForm = useForm<TaskFormSchema>({
    defaultValues: DEFAULT_TASK_ITEM,
    resolver: zodResolver(taskFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onDrawerSave = (index: number) => {
    drawerForm.trigger().then((valid) => {
      if (valid) {
        const values = drawerForm.getValues();

        if (index !== fields.length) {
          update(index, { ...fields[index], ...values });
        } else {
          append({ ...values, id: uuid(), done: false });
        }

        drawerForm.reset();

        onDrawerClose();
      }
    });

    trigger().then();
  };

  const onDrawerOpen = () => {
    setOpenTaskDrawer(true);
    setOpenTaskIndex(fields.length);
  };

  const onDrawerClose = () => {
    setOpenTaskDrawer(false);
    setTimeout(() => {
      setOpenTaskIndex(undefined);
    }, 300);
  };

  const handleCardClick = (index: number) => {
    setOpenTaskIndex(index);
    setOpenTaskDrawer(true);
    drawerForm.setValue("title", fields[index]?.title);
    drawerForm.setValue("note", fields[index]?.note || "");
    drawerForm.setValue(
      "deadlineTimestamp",
      fields[index]?.deadlineTimestamp || undefined,
    );
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-2 sm:p-4">
      <EmptyState
        text="Задачи отсутствуют"
        condition={Boolean(!(fields?.length || 0) && readOnly)}
      />

      {fields?.map((field, index) => (
        <TaskCard
          key={field.id}
          task={field}
          onClick={() => handleCardClick(index)}
          onDelete={!readOnly ? () => remove(index) : undefined}
        />
      ))}

      {!readOnly && (
        <Button type="button" variant="secondary" onClick={onDrawerOpen}>
          <PlusIcon className="text-current" />
          <span>Добавить задачу</span>
        </Button>
      )}

      <FormProvider {...drawerForm}>
        <TaskDrawer
          open={openTaskDrawer}
          index={openTaskIndex || 0}
          title={
            fields[openTaskIndex || 0] ? "Изменить задачу" : "Добавить задачу"
          }
          readOnly={readOnly}
          onSave={onDrawerSave}
          onDrawerClose={onDrawerClose}
        />
      </FormProvider>
    </div>
  );
}

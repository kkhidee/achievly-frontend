import { GoalDto, goalDtoSchema } from "@/shared/api";
import { ReactNode, useState } from "react";
import {
  Badge,
  Button,
  CategoryField,
  CircleLoader,
  DeadlineTimestampField,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  NoteField,
  TitleField,
  TypeField,
} from "@/shared/ui";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";
import { useGoalsOngoingOverlayHandlers } from "@/widgets/goals-ongoing/hooks/use-overlay-handlers";

type GoalOngoingDrawerWrapperProps = {
  goal: GoalDto;
  children: ReactNode;
  isUpdatePending: boolean;
  isAchievePending: boolean;
  isDeletePending: boolean;
  onUpdate: (values: GoalDto) => Promise<void>;
  onAchieve: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const GoalOngoingDrawerWrapper = ({
  goal,
  children,
  isUpdatePending,
  isAchievePending,
  isDeletePending,
  onUpdate,
  onAchieve,
  onDelete,
}: GoalOngoingDrawerWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<GoalDto>({
    defaultValues: { ...goal, note: goal?.note || "" },
    resolver: zodResolver(goalDtoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { habits, tasks } = useWatch({ control: form.control });

  const {
    handleSetQuery,
    handleOpenChange,
    handleUpdate,
    handleAchieve,
    handleDelete,
  } = useGoalsOngoingOverlayHandlers({
    goal,
    form,
    setOpen,
    onUpdate,
    onAchieve,
    onDelete,
  });

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger onClick={handleSetQuery}>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[90%] [&>div:first-child]:min-h-2">
        <div className="relative flex flex-col overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Редактировать цель</DrawerTitle>
            <DrawerDescription>
              Вы можете внести изменения и сохранить их
            </DrawerDescription>
          </DrawerHeader>
          <FormProvider {...form}>
            <div className="flex flex-col gap-4 px-4">
              <TitleField control={form.control} label="Заголовок цели" />
              <CategoryField control={form.control} label="Категория" />
              <TypeField control={form.control} label="Тип цели" />
              <DeadlineTimestampField
                control={form.control}
                label="Дата завершения цели"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <h3 className="text-sm font-medium">Привычки</h3>
                  <Badge className="flex size-[28px] items-center justify-center rounded-full">
                    {habits?.length || 0}
                  </Badge>
                </div>
                <HabitsList />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <h3 className="text-sm font-medium">Задачи</h3>
                  <Badge className="flex size-[28px] items-center justify-center rounded-full">
                    {tasks?.length || 0}
                  </Badge>
                </div>
                <TasksList />
              </div>
              <NoteField control={form.control} label="Примечание" />
            </div>
          </FormProvider>
          <DrawerFooter className="sticky bottom-0 w-full bg-background pb-6">
            {form.formState.isDirty ? (
              <Button
                className="w-full"
                onClick={handleUpdate}
                disabled={isUpdatePending || !form.formState.isValid}
              >
                {isUpdatePending ? <CircleLoader /> : "Обновить данные цели"}
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={handleAchieve}
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
                    onClick={handleDelete}
                    disabled={isDeletePending}
                  >
                    {isDeletePending ? <CircleLoader /> : "Удалить"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { GoalOngoingDrawerWrapper };

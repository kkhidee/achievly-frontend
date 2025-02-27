import { GoalDto, goalDtoSchema, GoalDtoTypeEnum } from "@/shared/api";
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
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";
import { useGoalsAchievedOverlayHandlers } from "@/widgets/goals-achieved/hooks/use-overlay-handlers";

type GoalAchievedDrawerWrapperProps = {
  goal: GoalDto;
  children: ReactNode;
  isUpdatePending: boolean;
  isDeletePending: boolean;
  onToggleType: (goal: GoalDto) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const GoalAchievedDrawerWrapper = ({
  goal,
  children,
  isUpdatePending,
  isDeletePending,
  onToggleType,
  onDelete,
}: GoalAchievedDrawerWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<GoalDto>({
    defaultValues: goal,
    resolver: zodResolver(goalDtoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSetQuery, handleOpenChange, handleToggleType, handleDelete } =
    useGoalsAchievedOverlayHandlers({
      goal,
      form,
      setOpen,
      onToggleType,
      onDelete,
    });

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger onClick={handleSetQuery}>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[90%] [&>div:first-child]:min-h-2">
        <div className="relative flex flex-col overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Просмотр цели</DrawerTitle>
            <DrawerDescription>
              Вы можете внести изменения и сохранить их
            </DrawerDescription>
          </DrawerHeader>
          <FormProvider {...form}>
            <div className="flex flex-col gap-4 px-4">
              <TitleField
                control={form.control}
                label="Заголовок цели"
                disabled
              />
              <CategoryField
                control={form.control}
                label="Категория"
                disabled
              />
              <TypeField control={form.control} label="Тип цели" disabled />
              <DeadlineTimestampField
                control={form.control}
                label="Дата завершения цели"
                disabled
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <h3 className="text-sm font-medium">Привычки</h3>
                  <Badge className="flex size-[28px] items-center justify-center rounded-full">
                    {goal?.habits?.length || 0}
                  </Badge>
                </div>
                <HabitsList readOnly />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-2">
                  <h3 className="text-sm font-medium">Задачи</h3>
                  <Badge className="flex size-[28px] items-center justify-center rounded-full">
                    {goal?.tasks?.length || 0}
                  </Badge>
                </div>
                <TasksList readOnly />
              </div>
              <NoteField control={form.control} label="Примечание" disabled />
            </div>
          </FormProvider>
          <DrawerFooter className="sticky bottom-0 w-full bg-background pb-6">
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

            <Button
              className="w-full"
              onClick={handleToggleType}
              disabled={isUpdatePending || !form.formState.isValid}
            >
              {isUpdatePending ? (
                <CircleLoader />
              ) : (
                `Сделать ${
                  goal?.type === GoalDtoTypeEnum.private
                    ? "публичной"
                    : "приватной"
                }`
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { GoalAchievedDrawerWrapper };

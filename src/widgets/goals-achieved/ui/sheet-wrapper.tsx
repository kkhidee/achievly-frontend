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
  NoteField,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  TitleField,
  TypeField,
} from "@/shared/ui";
import { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GoalDto, goalDtoSchema, GoalDtoTypeEnum } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";
import { useGoalsAchievedOverlayHandlers } from "@/widgets/goals-achieved/hooks/use-overlay-handlers";

type GoalAchievedSheetWrapperProps = {
  goal: GoalDto;
  children: ReactNode;
  isUpdatePending: boolean;
  isDeletePending: boolean;
  onToggleType: (goal: GoalDto) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

const GoalAchievedSheetWrapper = ({
  goal,
  children,
  isUpdatePending,
  isDeletePending,
  onToggleType,
  onDelete,
}: GoalAchievedSheetWrapperProps) => {
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
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger onClick={handleSetQuery}>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto pb-0 sm:max-w-[40%]">
        <div className="relative flex min-h-full flex-col">
          <div className="flex h-full flex-1 flex-col">
            <SheetHeader>
              <SheetTitle>Просмотр цели</SheetTitle>
              <SheetDescription>
                Вы можете просмотреть данные цели
              </SheetDescription>
            </SheetHeader>
            <FormProvider {...form}>
              <div className="flex flex-col gap-4 py-4">
                <TitleField
                  disabled
                  control={form.control}
                  label="Заголовок цели"
                />
                <CategoryField
                  disabled
                  control={form.control}
                  label="Категория"
                />
                <TypeField disabled control={form.control} label="Тип цели" />
                <DeadlineTimestampField
                  disabled
                  control={form.control}
                  label="Дата завершения цели"
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
          </div>
          <SheetFooter className="sticky bottom-0 w-full bg-background pb-6">
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
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { GoalAchievedSheetWrapper };

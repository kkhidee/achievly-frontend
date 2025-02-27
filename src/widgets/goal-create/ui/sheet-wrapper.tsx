import {
  Badge,
  Button,
  CategoryField,
  CircleLoader,
  DeadlineTimestampField,
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
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { GoalDto } from "@/shared/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";
import { DEFAULT_GOAL_FORM_VALUES } from "@/app/constants/goal";
import { useGoalCreateOverlayHandlers } from "@/widgets/goal-create/hooks/use-overlay-handlers";
import { createGoalDtoSchema } from "@/shared/zod";

type GoalCreateSheetWrapperProps = {
  children: ReactNode;
  isCreatePending: boolean;
  onCreate: (values: GoalDto) => Promise<void>;
};

const GoalCreateSheetWrapper = ({
  children,
  isCreatePending,
  onCreate,
}: GoalCreateSheetWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<GoalDto>({
    defaultValues: DEFAULT_GOAL_FORM_VALUES,
    resolver: zodResolver(createGoalDtoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { habits, tasks } = useWatch({ control: form.control });

  const { handleCreate, handleOpenChange } = useGoalCreateOverlayHandlers({
    form,
    setOpen,
    onCreate,
  });

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto pb-0 sm:max-w-[40%]">
        <div className="relative flex min-h-full flex-col">
          <div className="flex h-full flex-1 flex-col">
            <SheetHeader>
              <SheetTitle>Создать цель</SheetTitle>
              <SheetDescription>
                Заполните необходимые поля и создайте цель
              </SheetDescription>
            </SheetHeader>
            <FormProvider {...form}>
              <div className="flex flex-col gap-4 py-4">
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
          </div>
          <SheetFooter className="sticky bottom-0 w-full bg-background pb-6">
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={isCreatePending}
            >
              {isCreatePending ? <CircleLoader /> : "Создать цель"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { GoalCreateSheetWrapper };

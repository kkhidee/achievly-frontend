import { GoalDto, goalDtoSchema } from "@/shared/api";
import { ReactNode, useState } from "react";
import {
  Badge,
  Button,
  CategoryField,
  CircleLoader,
  DeadlineTimestampField,
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
import { DEFAULT_GOAL_FORM_VALUES } from "@/app/constants/goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";
import { useGoalCreateOverlayHandlers } from "@/widgets/goal-create/hooks/use-overlay-handlers";

type GoalCreateDrawerWrapperProps = {
  children: ReactNode;
  isCreatePending: boolean;
  onCreate: (values: GoalDto) => Promise<void>;
};

const GoalCreateDrawerWrapper = ({
  children,
  isCreatePending,
  onCreate,
}: GoalCreateDrawerWrapperProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<GoalDto>({
    defaultValues: DEFAULT_GOAL_FORM_VALUES,
    resolver: zodResolver(goalDtoSchema),
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
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[90%] [&>div:first-child]:min-h-2">
        <div className="relative flex flex-col overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Создать цель</DrawerTitle>
            <DrawerDescription>
              Заполните необходимые поля и создайте цель
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
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={isCreatePending}
            >
              {isCreatePending ? <CircleLoader /> : "Создать цель"}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { GoalCreateDrawerWrapper };

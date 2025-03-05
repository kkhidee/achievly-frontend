import { GoalDto } from "@/shared/api";
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
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";
import { PlusIcon } from "lucide-react";

type GoalCreateDrawerWrapperProps = {
  open: boolean;
  isPending: boolean;
  handleOpenChange: (value: boolean) => void;
  handleCreate: () => void;
};

const GoalCreateDrawerWrapper = ({
  open,
  isPending,
  handleOpenChange,
  handleCreate,
}: GoalCreateDrawerWrapperProps) => {
  const form = useFormContext<GoalDto>();

  const { habits, tasks } = useWatch({ control: form.control });

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="mr-4 rounded-full">
          <PlusIcon className="text-current" /> Создать цель
        </Button>
      </DrawerTrigger>
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
              disabled={isPending}
            >
              {isPending ? <CircleLoader /> : "Создать цель"}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export { GoalCreateDrawerWrapper };

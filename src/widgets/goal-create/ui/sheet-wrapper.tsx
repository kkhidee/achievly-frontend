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
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { GoalDto } from "@/shared/api";
import { HabitsList } from "@/features/habits-list";
import { TasksList } from "@/features/tasks-list";
import { PlusIcon } from "lucide-react";

type GoalCreateSheetWrapperProps = {
  open: boolean;
  isPending: boolean;
  handleOpenChange: (value: boolean) => void;
  handleCreate: () => void;
};

const GoalCreateSheetWrapper = ({
  open,
  isPending,
  handleOpenChange,
  handleCreate,
}: GoalCreateSheetWrapperProps) => {
  const form = useFormContext<GoalDto>();

  const { habits, tasks } = useWatch({ control: form.control });

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="mr-4 rounded-full">
          <PlusIcon className="text-current" /> Создать цель
        </Button>
      </SheetTrigger>
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
              disabled={isPending}
            >
              {isPending ? <CircleLoader /> : "Создать цель"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { GoalCreateSheetWrapper };

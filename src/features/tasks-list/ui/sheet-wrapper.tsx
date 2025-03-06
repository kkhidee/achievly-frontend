import { useFormContext } from "react-hook-form";
import {
  Button,
  DeadlineTimestampField,
  NoteField,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  TitleField,
} from "@/shared/ui";
import { ReactNode, useState } from "react";
import { TaskEntity } from "@/shared/api";

type TasksListSheetWrapperProps = {
  index: number;
  task?: TaskEntity;
  children: ReactNode;
  title?: string;
  readOnly?: boolean;
  completeOnly?: boolean;
  onSave: (index: number) => void;
  onTriggerClick: (index: number) => void;
  onToggleComplete?: (index: number) => Promise<void>;
};

function TasksListSheetWrapper({
  index,
  task,
  title,
  readOnly,
  completeOnly,
  onSave,
  children,
  onTriggerClick,
  onToggleComplete,
}: TasksListSheetWrapperProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { control, reset } = useFormContext();

  const handleSave = () => {
    onSave(index);
  };

  const handleCancel = () => {
    reset();
  };

  const handleToggleComplete = async () => {
    setOpen(false);
    setTimeout(() => onToggleComplete?.(index), 100);
  };

  const handleTrigger = () => {
    onTriggerClick(index);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger onClick={handleTrigger}>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto pb-0 sm:max-w-[30%]">
        <div className="relative flex h-full flex-col">
          <div className="flex h-full flex-col">
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
              <SheetDescription>
                {readOnly || completeOnly
                  ? "Вы можете просмотреть информацию о задаче"
                  : "Заполните поля, чтобы продолжить"}
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 py-4">
              <TitleField
                control={control}
                disabled={readOnly || completeOnly}
                label="Заголовок задачи"
              />
              <DeadlineTimestampField
                control={control}
                disabled={readOnly || completeOnly}
                label="Дата завершения задачи"
              />
              <NoteField
                control={control}
                disabled={readOnly || completeOnly}
                label="Примечание"
              />
            </div>
          </div>
          <SheetFooter className="sticky bottom-0 w-full bg-background pb-6">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCancel}
              >
                {readOnly || completeOnly ? "Закрыть" : "Отменить"}
              </Button>
            </SheetClose>
            {!readOnly && !completeOnly && (
              <SheetClose asChild>
                <Button className="w-full" onClick={handleSave}>
                  Сохранить
                </Button>
              </SheetClose>
            )}
            {completeOnly && task && (
              <Button className="w-full" onClick={handleToggleComplete}>
                Отметить как {task.done ? "невыполненное" : "выполненное"}
              </Button>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { TasksListSheetWrapper };

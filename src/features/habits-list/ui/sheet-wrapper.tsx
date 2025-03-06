import { useFormContext } from "react-hook-form";
import {
  Button,
  NoteField,
  RepeatDaysField,
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
import { HabitEntity } from "@/shared/api";
import { useSearchParams } from "react-router-dom";
import { getStartOfDayTimestamp, isDoneHabit } from "@/app/lib/utils";

type HabitsListSheetWrapperProps = {
  children: ReactNode;
  index: number;
  habit?: HabitEntity;
  title?: string;
  readOnly?: boolean;
  completeOnly?: boolean;
  onSave: (index: number) => void;
  onTriggerClick: (index: number) => void;
  onToggleComplete?: (index: number) => Promise<void>;
};

function HabitsListSheetWrapper({
  children,
  index,
  habit,
  title,
  readOnly,
  completeOnly,
  onSave,
  onTriggerClick,
  onToggleComplete,
}: HabitsListSheetWrapperProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { control, reset } = useFormContext();

  const [searchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

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
                  ? "Вы можете просмотреть информацию о привычке"
                  : "Заполните поля, чтобы продолжить"}
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-4 py-4">
              <TitleField
                control={control}
                disabled={readOnly || completeOnly}
                label="Заголовок привычки"
              />
              <RepeatDaysField
                control={control}
                disabled={readOnly || completeOnly}
                label="Дни повтора"
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
                {readOnly ? "Закрыть" : "Отменить"}
              </Button>
            </SheetClose>
            {completeOnly && habit && (
              <Button className="w-full" onClick={handleToggleComplete}>
                Отметить как{" "}
                {isDoneHabit(
                  habit,
                  historyDate
                    ? getStartOfDayTimestamp(Number(historyDate))
                    : getStartOfDayTimestamp(),
                )
                  ? "невыполненное"
                  : "выполненное"}
              </Button>
            )}
            {!readOnly && !completeOnly && (
              <SheetClose asChild>
                <Button className="w-full" onClick={handleSave}>
                  Сохранить
                </Button>
              </SheetClose>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { HabitsListSheetWrapper };

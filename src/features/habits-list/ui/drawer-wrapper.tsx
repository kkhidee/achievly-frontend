import { useFormContext } from "react-hook-form";
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  NoteField,
  RepeatDaysField,
  TitleField,
} from "@/shared/ui";
import { ReactNode, useState } from "react";
import { HabitEntity } from "@/shared/api";
import { getStartOfDayTimestamp, isDoneHabit } from "@/app/lib/utils";
import { useSearchParams } from "react-router-dom";

type HabitsListDrawerWrapperProps = {
  index: number;
  habit?: HabitEntity;
  children: ReactNode;
  title?: string;
  readOnly?: boolean;
  completeOnly?: boolean;
  onSave: (index: number) => void;
  onTriggerClick: (index: number) => void;
  onToggleComplete?: (index: number) => Promise<void>;
};

function HabitsListDrawerWrapper({
  index,
  habit,
  title,
  readOnly,
  completeOnly,
  onSave,
  children,
  onTriggerClick,
  onToggleComplete,
}: HabitsListDrawerWrapperProps) {
  const [open, setOpen] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const { control, reset, trigger } = useFormContext();

  const handleSave = () => {
    trigger().then((valid) => {
      if (valid) {
        setOpen(false);
        setTimeout(() => onSave(index), 100);
      }
    });
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger onClick={handleTrigger}>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">{title}</DrawerTitle>
            <DrawerDescription className="text-center">
              {readOnly || completeOnly
                ? "Вы можете просмотреть информацию о привычке"
                : "Заполните поля, чтобы продолжить"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-y-4 px-4 py-6">
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
          <DrawerFooter className="flex items-center justify-between gap-3">
            {!readOnly && !completeOnly && (
              <Button className="w-full" onClick={handleSave}>
                Сохранить
              </Button>
            )}
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
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCancel}
              >
                {readOnly ? "Закрыть" : "Отменить"}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export { HabitsListDrawerWrapper };

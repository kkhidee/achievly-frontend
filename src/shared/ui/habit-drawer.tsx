import {
  Button,
  CircleLoader,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  NoteField,
  RepeatDaysField,
  TitleField,
} from "@/shared/ui";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  getAllHistoryQueryKey,
  getGoalQueryKey,
  getGoalsQueryKey,
  getStatisticsQueryKey,
  GoalDtoStatusEnum,
  HabitEntity,
  useToggleHabitComplete,
} from "@/shared/api";
import { getStartOfDayTimestamp } from "@/app/lib/utils";
import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

type HabitDrawerProps = {
  open: boolean;
  index: number;
  title?: string;
  readOnly?: boolean;
  onSave: (index: number) => void;
  onDrawerClose: () => void;
};

type HabitViewDrawerProps = {
  goalId: number | undefined;
  habit: HabitEntity | undefined;
  open: boolean;
  readOnly?: boolean;
  timestamp?: number;
  onDrawerClose: () => void;
};

function HabitDrawer({
  index,
  open,
  title,
  readOnly,
  onSave,
  onDrawerClose,
}: HabitDrawerProps) {
  const { control, reset } = useFormContext();

  const handleSave = () => {
    onSave(index);
  };

  const handleCancel = () => {
    reset();
  };

  const handleOpenChange = () => {
    onDrawerClose();
    reset();
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              {readOnly ? "Привычка" : title}
            </DrawerTitle>
            <DrawerDescription className="text-center">
              {readOnly
                ? "Вы можете просмотреть информацию о привычке"
                : "Заполните поля, чтобы продолжить"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-y-4 px-4 py-6">
            <TitleField
              control={control}
              disabled={readOnly}
              label="Заголовок привычки"
            />
            <RepeatDaysField
              control={control}
              disabled={readOnly}
              label="Дни повтора"
            />
            <NoteField
              control={control}
              disabled={readOnly}
              label="Примечание"
            />
          </div>
          <DrawerFooter className="flex items-center justify-between gap-3">
            {!readOnly && (
              <Button type="button" className="w-full" onClick={handleSave}>
                Сохранить
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

function HabitViewDrawer({
  goalId,
  habit,
  open,
  readOnly,
  timestamp,
  onDrawerClose,
}: HabitViewDrawerProps) {
  const queryClient = useQueryClient();

  const form = useForm({ values: habit });

  const { mutate, isPending } = useToggleHabitComplete({
    mutation: {
      onSuccess: () => {
        if (goalId) {
          queryClient
            .invalidateQueries({
              queryKey: getGoalQueryKey({ id: String(goalId) }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getGoalsQueryKey({ status: GoalDtoStatusEnum.ongoing }),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getAllHistoryQueryKey(),
            })
            .then();

          queryClient
            .invalidateQueries({
              queryKey: getStatisticsQueryKey({
                period: [
                  dayjs().weekday(0).format("YYYY-MM-DD"),
                  dayjs().weekday(6).format("YYYY-MM-DD"),
                ],
              }),
            })
            .then();

          onDrawerClose();
        }
      },
    },
  });

  const isIncludeDay = useMemo(
    () =>
      (habit?.doneDays || []).some(
        (day) => day === getStartOfDayTimestamp(timestamp),
      ),
    [habit?.doneDays, timestamp],
  );

  const handleToggleComplete = () => {
    if (habit?.id && goalId !== undefined) {
      mutate({
        id: String(goalId),
        habitId: habit.id,
      });
      form.reset();
    }
  };

  const handleOpenChange = () => {
    onDrawerClose();
    form.reset();
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <FormProvider {...form}>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-center">Привычка</DrawerTitle>
              <DrawerDescription className="text-center">
                Вы можете просмотреть информацию о привычке
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-y-4 px-4 py-6">
              <TitleField
                disabled
                control={form.control}
                label="Заголовок привычки"
              />
              <RepeatDaysField
                disabled
                control={form.control}
                label="Дни повтора"
              />
              <NoteField disabled control={form.control} label="Примечание" />
            </div>
            {!readOnly && (
              <DrawerFooter className="flex items-center justify-between gap-3">
                <Button
                  type="button"
                  className="w-full"
                  onClick={handleToggleComplete}
                >
                  {isPending ? (
                    <CircleLoader />
                  ) : isIncludeDay ? (
                    "Отметить как невыполненное"
                  ) : (
                    "Отметить как выполненное"
                  )}
                </Button>
              </DrawerFooter>
            )}
          </div>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}

export { HabitDrawer, HabitViewDrawer };

import {
  getAllHistoryQueryKey,
  getGoalsQueryKey,
  GoalDto,
  GoalDtoStatusEnum,
  useToggleHabitComplete,
} from "@/shared/api";
import { HabitCard } from "@/shared/ui";
import { PlusIcon } from "lucide-react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_HABIT_ITEM } from "@/app/constants/habit";
import { habitFormSchema } from "@/shared/zod";
import { v4 as uuid } from "uuid";
import { HabitFormSchema } from "@/shared/zod/habitFormSchema";
import { EmptyState } from "@/shared/ui/empty-state";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { HabitsListDrawerWrapper } from "@/features/habits-list/ui/drawer-wrapper";
import { HabitsListSheetWrapper } from "@/features/habits-list/ui/sheet-wrapper";
import { useQueryClient } from "@tanstack/react-query";

type HabitListProps = {
  readOnly?: boolean;
  completeOnly?: boolean;
};

export function HabitsList({ readOnly, completeOnly }: HabitListProps) {
  const isMobile = useIsMobile();

  const queryClient = useQueryClient();

  const { control, trigger, getValues } = useFormContext<GoalDto>();

  const { mutateAsync } = useToggleHabitComplete({
    mutation: {
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: getGoalsQueryKey({
              status: GoalDtoStatusEnum.ongoing,
            }),
          })
          .then();

        queryClient
          .invalidateQueries({
            queryKey: getAllHistoryQueryKey(),
          })
          .then();
      },
    },
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "habits",
  });

  const habitForm = useForm<HabitFormSchema>({
    defaultValues: DEFAULT_HABIT_ITEM,
    resolver: zodResolver(habitFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSave = (index: number) => {
    habitForm.trigger().then((valid) => {
      if (valid) {
        const values = habitForm.getValues();

        if (index !== fields.length) {
          update(index, { ...fields[index], ...values });
        } else {
          append({ ...values, id: uuid() });
        }

        habitForm.reset();
      }
    });

    trigger().then();
  };

  const onToggleComplete = async (index: number) => {
    const id = getValues()?.id;

    const habitId = getValues()?.habits?.[index]?.id;

    if (habitId) await mutateAsync({ id: String(id), habitId });
  };

  const onTriggerClick = (index: number) => {
    habitForm.setValue("title", fields[index]?.title);
    habitForm.setValue("repeatDays", fields?.[index]?.repeatDays);
    habitForm.setValue("note", fields[index]?.note || "");
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <EmptyState
        text="Привычки отсутствуют"
        condition={Boolean(!(fields?.length || 0) && readOnly)}
      />

      {(fields || []).map((field, index) => (
        <FormProvider key={field.id} {...habitForm}>
          {isMobile ? (
            <HabitsListDrawerWrapper
              index={index}
              habit={field}
              readOnly={readOnly}
              completeOnly={completeOnly}
              title={
                readOnly || completeOnly ? "Привычка" : "Изменить привычку"
              }
              onSave={onSave}
              onTriggerClick={onTriggerClick}
              onToggleComplete={onToggleComplete}
            >
              <HabitCard
                habit={field}
                onDelete={
                  !readOnly && !completeOnly ? () => remove(index) : undefined
                }
              />
            </HabitsListDrawerWrapper>
          ) : (
            <HabitsListSheetWrapper
              index={index}
              habit={field}
              readOnly={readOnly}
              completeOnly={completeOnly}
              title={
                readOnly || completeOnly ? "Привычка" : "Изменить привычку"
              }
              onSave={onSave}
              onTriggerClick={onTriggerClick}
              onToggleComplete={onToggleComplete}
            >
              <HabitCard
                habit={field}
                onDelete={
                  !readOnly && !completeOnly ? () => remove(index) : undefined
                }
              />
            </HabitsListSheetWrapper>
          )}
        </FormProvider>
      ))}

      {!readOnly && !completeOnly && (
        <FormProvider {...habitForm}>
          {isMobile ? (
            <HabitsListDrawerWrapper
              index={fields.length}
              title="Добавить привычку"
              onSave={onSave}
              onTriggerClick={onTriggerClick}
            >
              <div className="flex h-9 items-center justify-center gap-x-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 [&_svg]:size-4 [&_svg]:shrink-0">
                <PlusIcon className="text-current" />
                <span>Добавить привычку</span>
              </div>
            </HabitsListDrawerWrapper>
          ) : (
            <HabitsListSheetWrapper
              index={fields.length}
              title="Добавить привычку"
              onSave={onSave}
              onTriggerClick={onTriggerClick}
            >
              <div className="flex h-9 items-center justify-center gap-x-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80 [&_svg]:size-4 [&_svg]:shrink-0">
                <PlusIcon className="text-current" />
                <span>Добавить привычку</span>
              </div>
            </HabitsListSheetWrapper>
          )}
        </FormProvider>
      )}
    </div>
  );
}

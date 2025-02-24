import { GoalDto } from "@/shared/api";
import { useState } from "react";
import { Button, HabitCard, HabitDrawer } from "@/shared/ui";
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

type HabitListProps = {
  readOnly?: boolean;
};

export function HabitList({ readOnly }: HabitListProps) {
  const [openHabitIndex, setOpenHabitIndex] = useState<number>();

  const [openHabitDrawer, setOpenHabitDrawer] = useState<boolean>(false);

  const { control, trigger } = useFormContext<GoalDto>();

  const { fields, append, update } = useFieldArray({
    control,
    name: "habits",
  });

  const drawerForm = useForm<HabitFormSchema>({
    defaultValues: DEFAULT_HABIT_ITEM,
    resolver: zodResolver(habitFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onDrawerSave = (index: number) => {
    drawerForm.trigger().then((valid) => {
      if (valid) {
        const values = drawerForm.getValues();

        if (index !== fields.length) {
          update(index, { ...fields[index], ...values });
        } else {
          append({ ...values, id: uuid() });
        }

        onDrawerClose();

        drawerForm.reset();
      }
    });

    trigger().then();
  };

  const onDrawerOpen = () => {
    setOpenHabitDrawer(true);
    setOpenHabitIndex(fields.length);
  };

  const onDrawerClose = () => {
    setOpenHabitDrawer(false);
    setTimeout(() => {
      setOpenHabitIndex(undefined);
    }, 300);
  };

  const handleCardClick = (index: number) => {
    setOpenHabitIndex(index);
    setOpenHabitDrawer(true);
    drawerForm.setValue("title", fields[index]?.title);
    drawerForm.setValue("repeatDays", fields?.[index]?.repeatDays);
    drawerForm.setValue("note", fields[index]?.note || "");
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-2 sm:p-4">
      <EmptyState
        text="Привычки отсутствуют"
        condition={Boolean(!(fields?.length || 0) && readOnly)}
      />

      {fields?.map((field, index) => (
        <HabitCard
          key={field.id}
          habit={field}
          onClick={() => handleCardClick(index)}
        />
      ))}

      {!readOnly && (
        <Button variant="secondary" type="button" onClick={onDrawerOpen}>
          <PlusIcon className="text-current" />
          <span>Добавить привычку</span>
        </Button>
      )}

      <FormProvider {...drawerForm}>
        <HabitDrawer
          open={openHabitDrawer}
          index={openHabitIndex || 0}
          title={
            fields[openHabitIndex || 0]
              ? "Изменить привычку"
              : "Добавить привычку"
          }
          readOnly={readOnly}
          onSave={onDrawerSave}
          onDrawerClose={onDrawerClose}
        />
      </FormProvider>
    </div>
  );
}

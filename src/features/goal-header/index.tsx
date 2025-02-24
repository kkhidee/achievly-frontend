import { Badge, Button, GoalHeaderDrawer } from "@/shared/ui";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { GoalDto, GoalDtoCategoryEnum } from "@/shared/api";
import {
  DEFAULT_HEADER_FORM_VALUES,
  GOAL_CATEGORY,
  GOAL_TYPE,
} from "@/app/constants/goal";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalHeaderFormSchema } from "@/shared/zod";
import { z } from "zod";
import { Calendar, PencilLine } from "lucide-react";
import { formatTimestampDaysUntilDeadline } from "@/app/lib/utils";
import { useState } from "react";

type GoalHeaderProps = {
  readOnly?: boolean;
};

export function GoalHeader({ readOnly }: GoalHeaderProps) {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const { control, setValue, trigger, getValues } = useFormContext<GoalDto>();

  const { title, category, type, deadlineTimestamp } = useWatch({ control });

  const drawerForm = useForm<z.infer<typeof goalHeaderFormSchema>>({
    defaultValues: DEFAULT_HEADER_FORM_VALUES,
    resolver: zodResolver(goalHeaderFormSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onDrawerSave = () => {
    drawerForm.trigger().then((valid) => {
      if (valid) {
        const values = drawerForm.getValues();

        setValue("title", values.title, { shouldDirty: true });
        setValue("type", values.type, { shouldDirty: true });
        setValue("category", values.category as GoalDtoCategoryEnum, {
          shouldDirty: true,
        });
        setValue("deadlineTimestamp", values.deadlineTimestamp, {
          shouldDirty: true,
        });

        onDrawerClose();

        drawerForm.reset();

        trigger().then();
      }
    });
  };

  const onDrawerOpen = () => {
    const values = getValues();

    setOpenDrawer(true);
    drawerForm.setValue("title", values?.title as string);
    drawerForm.setValue("type", values?.type);
    drawerForm.setValue("category", values?.category as GoalDtoCategoryEnum);
    drawerForm.setValue(
      "deadlineTimestamp",
      values?.deadlineTimestamp as number,
    );
  };

  const onDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div className="flex flex-col gap-2 p-4 pb-2">
      <div className="flex items-center justify-between">
        <span className="text-lg font-medium">{title || "Заголовок цели"}</span>
        {!readOnly && (
          <Button
            className="size-[36px] rounded-full"
            variant="outline"
            onClick={onDrawerOpen}
          >
            <PencilLine />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Badge>{category ? GOAL_CATEGORY[category] : "Категория"}</Badge>
        <Badge variant="secondary">{type ? GOAL_TYPE[type] : "Тип"}</Badge>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span className="text-xs">
            {deadlineTimestamp
              ? formatTimestampDaysUntilDeadline(deadlineTimestamp)
              : "Нет даты завершения цели"}
          </span>
        </div>
      </div>

      <FormProvider {...drawerForm}>
        <GoalHeaderDrawer
          title="Настроить цель"
          open={openDrawer}
          onDrawerClose={onDrawerClose}
          onSave={onDrawerSave}
        />
      </FormProvider>
    </div>
  );
}

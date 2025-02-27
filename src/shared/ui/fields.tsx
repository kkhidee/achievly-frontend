import {
  Button,
  Calendar,
  Checkbox,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ResizeTextarea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { FieldValues, Path, UseControllerProps } from "react-hook-form";
import { GoalDtoCategoryEnum, GoalDtoTypeEnum } from "@/shared/api";
import { cn } from "@/app/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { REPEAT_DAYS } from "@/app/constants/habit";
import { GOAL_CATEGORY, GOAL_TYPE } from "@/app/constants/goal";
import { ru } from "date-fns/locale";

type FormFieldProps<T extends FieldValues, K extends Path<T>> = {
  control: UseControllerProps<T, K>["control"];
  label?: string;
  className?: string;
  disabled?: boolean;
};

function TitleField<T extends FieldValues, K extends Path<T>>({
  control,
  label,
  disabled,
}: FormFieldProps<T, K>) {
  return (
    <FormField
      control={control}
      name={"title" as UseControllerProps<T, K>["name"]}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Введите заголовок"
              value={field.value || ""}
              onChange={field.onChange}
              className="text-sm sm:text-base"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

TitleField.displayName = "TitleField";

function CategoryField<T extends FieldValues, K extends Path<T>>({
  control,
  label,
  disabled,
}: FormFieldProps<T, K>) {
  return (
    <FormField
      control={control}
      name={"category" as UseControllerProps<T, K>["name"]}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value || undefined}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(GoalDtoCategoryEnum).map((tag, index) => (
                    <SelectItem key={index} value={tag}>
                      {GOAL_CATEGORY[tag]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

CategoryField.displayName = "CategoryField";

function TypeField<T extends FieldValues, K extends Path<T>>({
  control,
  label,
  disabled,
}: FormFieldProps<T, K>) {
  return (
    <FormField
      control={control}
      name={"type" as UseControllerProps<T, K>["name"]}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value || undefined}
              onValueChange={field.onChange}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(GoalDtoTypeEnum).map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {GOAL_TYPE[type]}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

TypeField.displayName = "TypeField";

function DeadlineTimestampField<T extends FieldValues, K extends Path<T>>({
  control,
  label,
  disabled,
}: FormFieldProps<T, K>) {
  return (
    <FormField
      control={control}
      name={"deadlineTimestamp" as UseControllerProps<T, K>["name"]}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  disabled={disabled}
                >
                  <CalendarIcon />
                  {field.value ? (
                    format(new Date(field.value), "PPP", { locale: ru })
                  ) : (
                    <span>Выбрать дату</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="pointer-events-auto w-auto p-0"
                align="start"
              >
                <Calendar
                  ISOWeek
                  fixedWeeks
                  showOutsideDays
                  initialFocus
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  disabled={(date) => date <= new Date()}
                  onSelect={(date) => field.onChange(date?.getTime())}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

DeadlineTimestampField.displayName = "DeadlineTimestampField";

function RepeatDaysField<T extends FieldValues, K extends Path<T>>({
  control,
  label,
  disabled,
}: FormFieldProps<T, K>) {
  return (
    <FormField
      control={control}
      name={"repeatDays" as UseControllerProps<T, K>["name"]}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex justify-between">
              {REPEAT_DAYS.map((day) => (
                <Checkbox
                  key={day.value}
                  className="size-[42px] rounded-full"
                  content={day.label}
                  checked={field.value.includes(day.value)}
                  disabled={disabled}
                  onCheckedChange={(checked) =>
                    checked
                      ? field.onChange([...(field.value || []), day.value])
                      : field.onChange(
                          field.value.filter((el: number) => el !== day.value),
                        )
                  }
                />
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

RepeatDaysField.displayName = "RepeatDaysField";

function NoteField<T extends FieldValues, K extends Path<T>>({
  control,
  label,
  className,
  disabled,
}: FormFieldProps<T, K>) {
  return (
    <div className={className}>
      <FormField
        control={control}
        name={"note" as UseControllerProps<T, K>["name"]}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <ResizeTextarea
                value={field.value || ""}
                placeholder="Описание"
                onChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

NoteField.displayName = "NoteField";

export {
  TitleField,
  CategoryField,
  TypeField,
  DeadlineTimestampField,
  RepeatDaysField,
  NoteField,
};

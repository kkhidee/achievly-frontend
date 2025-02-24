import {
  Button,
  CategoryField,
  DeadlineTimestampField,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  TitleField,
  TypeField,
} from "@/shared/ui";
import { useFormContext } from "react-hook-form";

type GoalHeaderDrawerProps = {
  open: boolean;
  title?: string;
  onSave: () => void;
  onDrawerClose: () => void;
};

export function GoalHeaderDrawer({
  open,
  title,
  onSave,
  onDrawerClose,
}: GoalHeaderDrawerProps) {
  const { control, reset } = useFormContext();

  const handleSave = () => {
    onSave();
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
            <DrawerTitle className="text-center">{title}</DrawerTitle>
            <DrawerDescription className="text-center">
              Заполните поля, чтобы продолжить
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col gap-4 p-4 pb-6">
            <TitleField control={control} label="Заголовок цели" />
            <CategoryField control={control} label="Категория" />
            <TypeField control={control} label="Тип цели" />
            <DeadlineTimestampField
              control={control}
              label="Дата завершения цели"
            />
          </div>
          <DrawerFooter>
            <Button onClick={handleSave}>Сохранить</Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleCancel}>
                Закрыть
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

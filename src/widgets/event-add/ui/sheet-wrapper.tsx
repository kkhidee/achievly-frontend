import {
  Button,
  CircleLoader,
  HabitCard,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TaskCard,
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/ui";
import { CalendarPlus2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CreateEventDto, GoalDto, HabitEntity, TaskEntity } from "@/shared/api";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

type EventAddSheetWrapperProps = {
  goals: GoalDto[] | undefined;
  isPending: boolean;
  onCreate: (events: CreateEventDto[]) => Promise<void>;
};

const EventAddSheetWrapper = ({
  goals,
  isPending,
  onCreate,
}: EventAddSheetWrapperProps) => {
  const [searchParams] = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);

  const [tempHabits, setTempHabits] = useState<string[]>();

  const [tempTasks, setTempTasks] = useState<string[]>();

  const goalsReduce = useMemo(
    () =>
      (goals || []).reduce(
        (acc, goal) => ({
          tasks: acc.tasks.concat(goal?.tasks || []),
          habits: acc.habits.concat(goal.habits || []),
        }),
        { tasks: [] as TaskEntity[], habits: [] as HabitEntity[] },
      ),
    [goals],
  );

  const handleCreate = async () => {
    const periodStart = searchParams.get("period-start") as string;

    const habitsEvents = (tempHabits || []).map((id) => ({
      title:
        goalsReduce.habits.find((habit) => habit.id === id)?.title || "Event",
      start: dayjs(periodStart)
        .hour(7)
        .minute(0)
        .second(0)
        .millisecond(0)
        .valueOf(),
      end: dayjs(periodStart)
        .hour(8)
        .minute(0)
        .second(0)
        .millisecond(0)
        .valueOf(),
    }));

    const tasksEvents = (tempTasks || []).map((id) => ({
      title: goalsReduce.tasks.find((task) => task.id === id)?.title || "Event",
      start: dayjs(periodStart)
        .hour(7)
        .minute(0)
        .second(0)
        .millisecond(0)
        .valueOf(),
      end: dayjs(periodStart)
        .hour(8)
        .minute(0)
        .second(0)
        .millisecond(0)
        .valueOf(),
    }));

    await onCreate([...habitsEvents, ...tasksEvents]);

    setOpen(false);
    setTempHabits(undefined);
    setTempTasks(undefined);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" className="mr-4 rounded-full">
          <CalendarPlus2 className="text-current" /> Добавить события
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto pb-0 sm:max-w-[40%]">
        <div className="relative flex min-h-full flex-col">
          <div className="flex h-full flex-1 flex-col">
            <SheetHeader>
              <SheetTitle>Добавить события</SheetTitle>
              <SheetDescription>
                Выберите несколько привычек и/или задач, чтобы добавить их в
                интерактивный календарь
              </SheetDescription>
            </SheetHeader>
            <Tabs defaultValue="habits">
              <TabsList className="mb-6 grid w-full grid-cols-2">
                <TabsTrigger value="habits">Привычки</TabsTrigger>
                <TabsTrigger value="tasks">Задачи</TabsTrigger>
              </TabsList>
              <TabsContent value="habits">
                <ToggleGroup
                  type="multiple"
                  value={tempHabits}
                  className="flex flex-col gap-y-2"
                  onValueChange={setTempHabits}
                >
                  {goalsReduce.habits.map((habit) => (
                    <ToggleGroupItem
                      key={habit.id}
                      value={habit.id}
                      className="h-auto w-full p-0 hover:bg-transparent hover:text-current"
                    >
                      <HabitCard habit={habit} />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </TabsContent>
              <TabsContent value="tasks">
                <ToggleGroup
                  type="multiple"
                  value={tempTasks}
                  className="flex flex-col gap-y-2"
                  onValueChange={setTempTasks}
                >
                  {goalsReduce.tasks.map((task) => (
                    <ToggleGroupItem
                      key={task.id}
                      value={task.id}
                      className="h-auto w-full p-0 hover:bg-transparent hover:text-current"
                    >
                      <TaskCard task={task} />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </TabsContent>
            </Tabs>
          </div>
          <SheetFooter className="sticky bottom-0 w-full bg-background pb-6">
            <Button
              className="w-full"
              onClick={handleCreate}
              disabled={isPending}
            >
              {isPending ? <CircleLoader /> : "Добавить события"}
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { EventAddSheetWrapper };

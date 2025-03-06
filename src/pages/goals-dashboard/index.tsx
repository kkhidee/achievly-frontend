import { GoalsOverview } from "@/widgets/goals-overview";
import { GoalsDatepicker } from "@/widgets/goals-datepicker";
import { GoalsOngoing } from "@/widgets/goals-ongoing";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui";
import { GoalDtoStatusEnum } from "@/shared/api";
import { GoalsAchieved } from "@/widgets/goals-achieved";
import { useSearchParams } from "react-router-dom";
import { cn, getStartOfDayTimestamp } from "@/app/lib/utils";
import { CalendarIcon } from "lucide-react";
import dayjs from "dayjs";
import { useMemo } from "react";

function GoalsDashboardPage() {
  const [searchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const date = useMemo(
    () =>
      historyDate
        ? new Date(Number(historyDate))
        : new Date(getStartOfDayTimestamp()),
    [historyDate],
  );

  return (
    <div className="flex size-full flex-col gap-6 lg:flex-row">
      <div className="flex flex-col gap-y-6 lg:size-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "bg-muted/50 justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date ? (
                dayjs(date).format("DD.MM.YYYY")
              ) : (
                <span>Выбрать дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-neutral-900 p-0" align="start">
            <GoalsDatepicker />
          </PopoverContent>
        </Popover>

        <div className="flex-1 rounded-xl bg-muted/50 p-4 pr-2 lg:overflow-y-hidden">
          <div className="size-full pr-2 lg:overflow-y-auto">
            <GoalsOverview />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-muted/50 lg:size-full">
        <Tabs
          defaultValue={GoalDtoStatusEnum.ongoing}
          className="flex size-full flex-col gap-y-4 py-4"
        >
          <TabsList className="mx-4 grid grid-cols-2">
            <TabsTrigger
              value={GoalDtoStatusEnum.ongoing}
              className="text-xs md:text-sm"
            >
              Текущие цели
            </TabsTrigger>
            <TabsTrigger
              value={GoalDtoStatusEnum.achieved}
              className="text-xs md:text-sm"
            >
              Выполненные цели
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value={GoalDtoStatusEnum.ongoing}
            className="mr-2 flex-1 px-4 pr-2 lg:overflow-y-auto"
          >
            <GoalsOngoing />
          </TabsContent>
          <TabsContent
            value={GoalDtoStatusEnum.achieved}
            className="mr-2 flex-1 px-4 pr-2 lg:overflow-y-auto"
          >
            <GoalsAchieved />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default GoalsDashboardPage;

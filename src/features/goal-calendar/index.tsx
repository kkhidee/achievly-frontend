import { cn, getStartOfDayTimestamp } from "@/app/lib/utils";
import { useGetAllHistory } from "@/shared/api";
import { Button, Calendar, Loader } from "@/shared/ui";
import { useSearchParams } from "react-router-dom";
import { CustomDay } from "@/features/goal-calendar/ui/custom-day";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function GoalCalendar() {
  const [expanded, setExpanded] = useState<boolean>(false);

  const [month, setMonth] = useState<Date>(new Date());

  const { data } = useGetAllHistory();

  const [searchParams, setSearchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const onDayClick = (day: number) => {
    if (day === getStartOfDayTimestamp() && !!historyDate) {
      searchParams.delete("history-date");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("history-date", String(day));
    setSearchParams(searchParams);
  };

  const onExpanded = () => {
    setExpanded(!expanded);
    if (expanded) setMonth(new Date());
  };

  if (!data?.history) return <Loader />;

  return (
    <div>
      <Calendar
        ISOWeek
        fixedWeeks
        showOutsideDays
        month={month}
        onMonthChange={setMonth}
        className="px-4 py-0"
        classNames={{
          caption: cn("flex justify-center pt-1 relative items-center", {
            ["hidden"]: !expanded,
          }),
          table: cn("w-full border-collapse space-y-1", {
            ["goal-table"]: !expanded,
          }),
          month: "space-y-4 w-full",
          head_row: "flex justify-between",
          row: cn("flex w-full mt-2 justify-between", {
            ["goal-calendar-row"]: !expanded,
          }),
        }}
        components={{
          Day: ({ date, displayMonth }) => (
            <CustomDay
              date={date}
              displayMonth={displayMonth}
              history={data?.history}
              onDayClick={onDayClick}
            />
          ),
        }}
      />
      <Button size="sm" variant="link" className="w-full" onClick={onExpanded}>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </div>
  );
}

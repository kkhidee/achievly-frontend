import { Calendar, Skeleton } from "@/shared/ui";
import { useGetAllHistory } from "@/shared/api";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { CustomCalendarDay } from "@/widgets/goals-datepicker/ui/custom-calendar-day";

function GoalsDatepicker() {
  const { data: allHistory, isLoading: isAllHistoryLoading } =
    useGetAllHistory();

  const [searchParams, setSearchParams] = useSearchParams();

  const historyDate = searchParams.get("history-date");

  const onDayClick = (day: number) => {
    if (dayjs(day).isToday() && !!historyDate) {
      searchParams.delete("history-date");
      setSearchParams(searchParams);
      return;
    }

    if (!dayjs(day).isToday()) {
      searchParams.set("history-date", String(day));
      setSearchParams(searchParams);
    }
  };

  if (isAllHistoryLoading) return <Skeleton className="size-full rounded-xl" />;

  return (
    <Calendar
      ISOWeek
      fixedWeeks
      showOutsideDays
      className="p-4"
      classNames={{
        month: "space-y-4 w-full",
        head_row: "flex justify-between",
        row: "flex w-full mt-2 justify-between",
      }}
      components={{
        Day: ({ date, displayMonth }) => (
          <CustomCalendarDay
            date={date}
            displayMonth={displayMonth}
            history={allHistory?.history}
            onDayClick={onDayClick}
          />
        ),
      }}
    />
  );
}

export { GoalsDatepicker };

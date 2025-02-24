import { useState } from "react";
import dayjs from "dayjs";
import { getStartOfDayTimestamp } from "@/app/lib/utils";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);

export const useStatisticsHandlers = () => {
  const [period, setPeriod] = useState([
    dayjs().weekday(0).format("YYYY-MM-DD"),
    dayjs().weekday(6).format("YYYY-MM-DD"),
  ]);

  const [tabValue, setTabValue] = useState("weekly");

  const handlePrevPeriod = () => {
    if (tabValue === "monthly") {
      setPeriod([
        dayjs(period[0]).subtract(1, "month").format("YYYY-MM-DD"),
        dayjs(period[0]).format("YYYY-MM-DD"),
      ]);
      return;
    }

    if (tabValue === "yearly") {
      setPeriod([
        dayjs(period[0]).subtract(1, "year").format("YYYY-MM-DD"),
        dayjs(period[0]).format("YYYY-MM-DD"),
      ]);
      return;
    }

    setPeriod([
      dayjs(period[0]).subtract(7, "day").format("YYYY-MM-DD"),
      dayjs(period[0]).subtract(1, "day").format("YYYY-MM-DD"),
    ]);
  };

  const handleNextPeriod = () => {
    if (tabValue === "monthly") {
      setPeriod([
        dayjs(period[1]).format("YYYY-MM-DD"),
        dayjs(period[1]).add(1, "month").format("YYYY-MM-DD"),
      ]);
      return;
    }

    if (tabValue === "yearly") {
      setPeriod([
        dayjs(period[1]).format("YYYY-MM-DD"),
        dayjs(period[1]).add(1, "year").format("YYYY-MM-DD"),
      ]);
      return;
    }

    setPeriod([
      dayjs(period[1]).add(1, "day").format("YYYY-MM-DD"),
      dayjs(period[1]).add(7, "day").format("YYYY-MM-DD"),
    ]);
  };

  const handleChangeTab = (value: string) => {
    setTabValue(value);

    const currentDay = dayjs(getStartOfDayTimestamp());

    if (value === "monthly") {
      setPeriod([
        currentDay.format("YYYY-MM-DD"),
        currentDay.add(1, "month").format("YYYY-MM-DD"),
      ]);
      return;
    }

    if (value === "yearly") {
      setPeriod([
        currentDay.format("YYYY-MM-DD"),
        currentDay.add(1, "year").format("YYYY-MM-DD"),
      ]);
      return;
    }

    setPeriod([
      dayjs().weekday(0).format("YYYY-MM-DD"),
      dayjs().weekday(6).format("YYYY-MM-DD"),
    ]);
  };

  return {
    period,
    tabValue,
    handlePrevPeriod,
    handleNextPeriod,
    handleChangeTab,
  };
};

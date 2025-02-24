import { useStatisticsHandlers } from "@/entities/statistics/hooks/use-handlers";
import { StatisticsIntervalTab } from "@/entities/statistics/ui/interval-tab";
import { StatisticsPeriod } from "@/entities/statistics/ui/period";
import { StatisticsDto, useGetStatistics } from "@/shared/api";
import { StatisticsGoalChart } from "@/entities/statistics/ui/goal-chart";
import { StatisticsHabitsChart } from "@/entities/statistics/ui/habits-chart";
import { StatisticsTasksChart } from "@/entities/statistics/ui/tasks-chart";
import { useMemo } from "react";

export function Statistics() {
  const {
    period,
    tabValue,
    handlePrevPeriod,
    handleNextPeriod,
    handleChangeTab,
  } = useStatisticsHandlers();

  const { data } = useGetStatistics({ params: { period } });

  const statistics = useMemo(() => {
    if (tabValue === "yearly")
      return (data?.statistics || []).reduce(
        (acc, item) => {
          const lastItem = acc[acc.length - 1];

          if (
            lastItem?.timestamp &&
            item?.timestamp &&
            new Date(lastItem.timestamp).getMonth() ===
              new Date(item.timestamp).getMonth()
          ) {
            return acc.map((el, index) => {
              if (index === acc.length - 1) {
                return {
                  ...el,
                  goalsCompleted:
                    (el.goalsCompleted || 0) + (item.goalsCompleted || 0),
                  habitsCompleted:
                    (el.habitsCompleted || 0) + (item.habitsCompleted || 0),
                  tasksCompleted:
                    (el.tasksCompleted || 0) + (item.tasksCompleted || 0),
                };
              }

              return el;
            });
          }

          return [...acc, item];
        },
        [] as StatisticsDto["statistics"],
      );

    return data?.statistics || [];
  }, [data?.statistics, tabValue]);

  return (
    <div className="flex h-full flex-col gap-3 px-4 sm:px-0">
      <StatisticsIntervalTab
        tabValue={tabValue}
        handleTabChange={handleChangeTab}
      />

      <StatisticsPeriod
        period={period}
        handlePrevPeriod={handlePrevPeriod}
        handleNextPeriod={handleNextPeriod}
      />

      <StatisticsGoalChart statistics={statistics} tabValue={tabValue} />

      <StatisticsHabitsChart statistics={statistics} tabValue={tabValue} />

      <StatisticsTasksChart statistics={statistics} tabValue={tabValue} />
    </div>
  );
}

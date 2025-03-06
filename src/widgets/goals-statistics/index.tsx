import { useMemo } from "react";
import { StatisticsDto, useGetStatistics } from "@/shared/api";
import { useStatisticsHandlers } from "@/widgets/goals-statistics/hooks/use-handlers";
import { GoalsStatisticsIntervalTab } from "@/widgets/goals-statistics/ui/interval-tab";
import { GoalsStatisticsPeriod } from "@/widgets/goals-statistics/ui/period";
import { GoalsStatisticsBarChart } from "@/widgets/goals-statistics/ui/bar-chart";
import { GoalsStatisticsLineChart } from "@/widgets/goals-statistics/ui/line-chart";

function GoalsStatistics() {
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
    <div className="mt-6 flex size-full flex-col gap-y-6 xl:mt-0">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center justify-center">
          <div className="w-full xl:w-1/2">
            <GoalsStatisticsIntervalTab
              tabValue={tabValue}
              handleTabChange={handleChangeTab}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full xl:w-1/2">
            <GoalsStatisticsPeriod
              period={period}
              handlePrevPeriod={handlePrevPeriod}
              handleNextPeriod={handleNextPeriod}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <GoalsStatisticsBarChart
          statistics={statistics}
          tabValue={tabValue}
          title="Выполненные цели"
          nameKey="goalsCompleted"
          className="h-[250px]"
        />

        <GoalsStatisticsBarChart
          statistics={statistics}
          tabValue={tabValue}
          title="Выполненные привычки"
          nameKey="habitsCompleted"
          className="h-[250px]"
        />

        <GoalsStatisticsBarChart
          statistics={statistics}
          tabValue={tabValue}
          title="Выполненные задачи"
          nameKey="tasksCompleted"
          className="h-[250px]"
        />

        <GoalsStatisticsLineChart
          statistics={statistics}
          tabValue={tabValue}
          className="h-[250px]"
        />
      </div>
    </div>
  );
}

export { GoalsStatistics };

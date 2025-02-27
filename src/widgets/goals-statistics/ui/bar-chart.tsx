import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { StatisticsDto } from "@/shared/api";
import { ChartConfig } from "@/shared/ui/chart";
import { cn } from "@/app/lib/utils";

type StatisticsGoalChartProps = {
  statistics: StatisticsDto["statistics"];
  tabValue: string;
  title: string;
  nameKey: string;
  className?: string;
};

function GoalsStatisticsBarChart({
  statistics,
  tabValue,
  title,
  nameKey,
  className,
}: StatisticsGoalChartProps) {
  const chartConfig = {
    goalsCompleted: {
      label: "Выполнено",
      color: `hsl(var(--chart-1))`,
    },
    habitsCompleted: {
      label: "Выполнено",
      color: `hsl(var(--chart-2))`,
    },
    tasksCompleted: {
      label: "Выполнено",
      color: `hsl(var(--chart-3))`,
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm lg:text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className={cn("aspect-auto", className)}
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={statistics || []}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("ru-RU", {
                  day: tabValue !== "yearly" ? "numeric" : undefined,
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={nameKey}
                  labelFormatter={(_, value) => {
                    return new Date(
                      value[0]?.payload?.timestamp,
                    ).toLocaleDateString("ru-RU", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              dataKey={nameKey}
              fill={chartConfig[nameKey as keyof typeof chartConfig].color}
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export { GoalsStatisticsBarChart };

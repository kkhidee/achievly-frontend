import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { StatisticsDto } from "@/shared/api";
import { ChartConfig } from "@/shared/ui/chart";
import { cn } from "@/app/lib/utils";

type GoalsStatisticsLineChartProps = {
  statistics: StatisticsDto["statistics"];
  tabValue: string;
  className?: string;
};

function GoalsStatisticsLineChart({
  statistics,
  tabValue,
  className,
}: GoalsStatisticsLineChartProps) {
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
        <CardTitle className="text-sm lg:text-base">Общая статистика</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className={cn("aspect-auto", className)}
          config={chartConfig}
        >
          <LineChart accessibilityLayer data={statistics || []}>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="goalsCompleted"
              type="monotone"
              stroke={chartConfig.goalsCompleted.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="habitsCompleted"
              type="monotone"
              stroke={chartConfig.habitsCompleted.color}
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="tasksCompleted"
              type="monotone"
              stroke={chartConfig.tasksCompleted.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>{" "}
      </CardContent>
    </Card>
  );
}

export { GoalsStatisticsLineChart };

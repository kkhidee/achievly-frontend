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

type StatisticsTasksChartProps = {
  statistics: StatisticsDto["statistics"];
  tabValue: string;
};

export function StatisticsTasksChart({
  statistics,
  tabValue,
}: StatisticsTasksChartProps) {
  const chartConfig = {
    tasksCompleted: {
      label: "Выполнено",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Выполненные задачи</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={statistics || []}
            margin={{
              top: 20,
            }}
          >
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
                  nameKey="tasksCompleted"
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
              dataKey="tasksCompleted"
              fill="hsl(var(--chart-3))"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

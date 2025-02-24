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

type StatisticsGoalChartProps = {
  statistics: StatisticsDto["statistics"];
  tabValue: string;
};

export function StatisticsGoalChart({
  statistics,
  tabValue,
}: StatisticsGoalChartProps) {
  const chartConfig = {
    goalsCompleted: {
      label: "Выполнено",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Закрытые цели</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-[250px] w-full"
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
                  nameKey="goalsCompleted"
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
              dataKey="goalsCompleted"
              fill="hsl(var(--chart-1))"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

import { Button } from "@/shared/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

type StatisticsPeriodProps = {
  period: string[];
  handlePrevPeriod: () => void;
  handleNextPeriod: () => void;
};

export function StatisticsPeriod({
  period,
  handlePrevPeriod,
  handleNextPeriod,
}: StatisticsPeriodProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="sm" onClick={handlePrevPeriod}>
        <ChevronLeft />
      </Button>
      <span className="text-sm">
        {new Date(period[0]).toLocaleDateString("ru-RU", {
          month: "short",
          day: "numeric",
          year:
            new Date(period[0]).getFullYear() !==
            new Date(period[1]).getFullYear()
              ? "numeric"
              : undefined,
        })}{" "}
        -{" "}
        {new Date(period[1]).toLocaleDateString("ru-RU", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </span>
      <Button variant="ghost" size="sm" onClick={handleNextPeriod}>
        <ChevronRight />
      </Button>
    </div>
  );
}

import { Button } from "@/shared/ui/button";
import { MoveLeft } from "lucide-react";
import { GoalCategoryIcon } from "@/shared/ui/goal-category-icon";
import { useNavigate, useParams } from "react-router-dom";
import { useFormContext, useWatch } from "react-hook-form";
import { GoalDto } from "@/shared/api";

export function GoalPreview() {
  const { id } = useParams<{ id: string }>();

  const { control } = useFormContext<GoalDto>();

  const { category } = useWatch({ control });

  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div className="relative flex min-h-[320px] w-full items-center justify-center bg-neutral-700">
      <div className="absolute top-0 flex w-full justify-between px-4 pt-6">
        <Button
          type="button"
          className="size-[36px] rounded-full"
          onClick={handleGoBack}
        >
          <MoveLeft />
        </Button>
        <span className="text-xl font-bold">
          {id ? "Цель" : "Создать цель"}
        </span>
        <div className="size-[36px]" />
      </div>

      <GoalCategoryIcon category={category || "default"} />
    </div>
  );
}

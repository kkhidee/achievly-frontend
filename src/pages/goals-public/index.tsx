import { useDebounce } from "@/shared/hooks/use-debounce";
import { useState } from "react";
import {
  getAllHistoryQueryKey,
  getGoalsQueryKey,
  GoalDto,
  GoalDtoCategoryEnum,
  GoalDtoStatusEnum,
  useCreateGoal,
  useGetPublicGoals,
} from "@/shared/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/shared/hooks/use-toast";
import {
  EmptyState,
  GoalCard,
  Input,
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/ui";
import { SearchIcon } from "lucide-react";
import { GOAL_CATEGORY } from "@/app/constants/goal";

function GoalsPublicPage() {
  const { value, debouncedValue, setValue } = useDebounce();

  const [selectedCategory, setSelectedCategory] = useState(
    GoalDtoCategoryEnum.education,
  );

  const queryClient = useQueryClient();

  const { data: publicGoals } = useGetPublicGoals({
    params: { search: debouncedValue || undefined, category: selectedCategory },
  });

  const { mutate } = useCreateGoal({
    mutation: {
      onSuccess: () => {
        toast({ title: "Цель добавлена" });
        queryClient
          .invalidateQueries({
            queryKey: getGoalsQueryKey({
              status: GoalDtoStatusEnum.ongoing,
            }),
          })
          .then();

        queryClient
          .invalidateQueries({
            queryKey: getAllHistoryQueryKey(),
          })
          .then();
      },
    },
  });

  const onClick = (goal: GoalDto) => {
    mutate({ data: goal });
  };

  return (
    <div className="flex size-full max-w-[100vw] flex-col gap-y-6">
      <div className="relative shrink-0">
        <Input
          value={value}
          placeholder="Введите запрос"
          className="pr-10 text-sm focus-visible:shadow-none sm:text-base"
          onChange={(event) => setValue(event.target.value)}
        />
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
      </div>
      <ToggleGroup
        type="single"
        value={selectedCategory}
        onValueChange={(value) =>
          setSelectedCategory(value as GoalDtoCategoryEnum)
        }
        className="flex shrink-0 items-center justify-normal gap-x-3 gap-y-2 overflow-y-auto sm:flex-wrap"
      >
        {Object.values(GoalDtoCategoryEnum).map((category) => (
          <ToggleGroupItem
            key={category}
            value={category}
            variant="outline"
            className="min-w-fit whitespace-nowrap rounded-3xl"
          >
            {GOAL_CATEGORY[category]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <EmptyState
        text="Публичные цели по запросу не найдены"
        condition={!publicGoals?.length}
      />

      {!!publicGoals?.length && (
        <div className="flex flex-col gap-y-4">
          {publicGoals?.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onClick={onClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalsPublicPage;

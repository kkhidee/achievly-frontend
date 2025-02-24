import { GoalDtoStatusEnum, useGetGoals } from "@/shared/api";
import { GoalCard } from "@/shared/ui/goal-card";
import { Loader } from "@/shared/ui";
import { RoutesEnum } from "@/app/constants/core";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { EmptyState } from "@/shared/ui/empty-state";

type GoalListProps = {
  status?: GoalDtoStatusEnum;
};

export function GoalList({
  status = GoalDtoStatusEnum.ongoing,
}: GoalListProps) {
  const { data, isLoading } = useGetGoals({ params: { status } });

  if (isLoading) return <Loader />;

  return (
    <Fragment>
      <EmptyState text="Цели отсутствуют" condition={!data?.length} />

      {data?.map((goal) => (
        <Link
          key={goal.id}
          to={`${RoutesEnum.Goals}/${goal.id}`}
          className="border-b border-b-neutral-800 last:border-b-0"
        >
          <GoalCard completedView deadlineView goal={goal} />
        </Link>
      ))}
    </Fragment>
  );
}

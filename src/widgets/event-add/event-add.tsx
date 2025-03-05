import { useIsMobile } from "@/shared/hooks/use-mobile";
import { EventAddDrawerWrapper } from "@/widgets/event-add/ui/drawer-wrapper";
import { EventAddSheetWrapper } from "@/widgets/event-add/ui/sheet-wrapper";
import {
  CreateEventDto,
  getEventsQueryKey,
  GoalDtoStatusEnum,
  useCreateEvents,
  useGetGoals,
} from "@/shared/api";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function EventAdd() {
  const isMobile = useIsMobile();

  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const { data: goals } = useGetGoals({
    params: { status: GoalDtoStatusEnum.ongoing },
  });

  const { mutateAsync: createEvents, isPending: isCreatePending } =
    useCreateEvents({
      mutation: {
        onSuccess: () => {
          queryClient
            .invalidateQueries({
              queryKey: getEventsQueryKey({
                period: [
                  searchParams.get("period-start") as string,
                  searchParams.get("period-end") as string,
                ],
              }),
            })
            .then();
        },
      },
    });

  const onCreate = async (events: CreateEventDto[]) => {
    await createEvents({ data: events });
  };

  return isMobile ? (
    <EventAddDrawerWrapper
      goals={goals}
      isPending={isCreatePending}
      onCreate={onCreate}
    />
  ) : (
    <EventAddSheetWrapper
      goals={goals}
      isPending={isCreatePending}
      onCreate={onCreate}
    />
  );
}

export { EventAdd };

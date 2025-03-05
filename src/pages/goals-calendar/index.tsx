import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import ru from "@fullcalendar/core/locales/ru";
import dayjs from "dayjs";
import {
  EventDto,
  getEventsQueryKey,
  useDeleteEvent,
  useGetEvents,
  useUpdateEvent,
} from "@/shared/api";
import { DatesSetArg, EventContentArg, EventDropArg } from "@fullcalendar/core";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";

function GoalsCalendarPage() {
  const [period, setPeriod] = useState([
    dayjs().weekday(0).format("YYYY-MM-DD"),
    dayjs().weekday(7).format("YYYY-MM-DD"),
  ]);

  const [searchParams, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const { data: events } = useGetEvents({
    params: {
      period,
    },
  });

  const { mutateAsync: updateEvent } = useUpdateEvent({
    mutation: {
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: getEventsQueryKey({
              period,
            }),
          })
          .then();
      },
    },
  });

  const { mutateAsync: deleteEvent } = useDeleteEvent({
    mutation: {
      onSuccess: () => {
        queryClient
          .invalidateQueries({
            queryKey: getEventsQueryKey({
              period,
            }),
          })
          .then();
      },
    },
  });

  const handleEventUpdate = (info: EventDropArg | EventResizeDoneArg) => {
    queryClient.setQueryData(
      getEventsQueryKey({
        period,
      }),
      (oldData: EventDto[]) =>
        oldData.map((event) => {
          if (event.id === Number(info.event.id)) {
            return {
              id: info.event.id,
              title: info.event.title,
              start: info.event.start?.getTime() || 0,
              end: info.event.end?.getTime() || 0,
            };
          }

          return event;
        }),
    );
    updateEvent({
      id: info.event.id,
      data: {
        title: info.event.title,
        start: info.event.start?.getTime() || 0,
        end: info.event.end?.getTime() || 0,
      },
    }).then();
  };

  const handleDatesSet = (dateInfo: DatesSetArg) => {
    const start = dateInfo.startStr.split("T")[0];
    const end = dateInfo.endStr.split("T")[0];
    setPeriod([start, end]);
    searchParams.set("period-start", start);
    searchParams.set("period-end", end);
    setSearchParams(searchParams);
  };

  const handleDelete = (info: EventContentArg) => {
    deleteEvent({ id: info.event.id }).then();
  };

  return (
    <div className="flex size-full gap-x-4">
      <div className="flex-1">
        <FullCalendar
          editable
          droppable
          height="100%"
          allDaySlot={false}
          locale={ru}
          initialDate={new Date().toISOString()}
          plugins={[timeGridPlugin, interactionPlugin]}
          slotMinTime={"07:00:00"}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          events={events?.map((event) => ({
            id: event.id.toString(),
            title: event.title,
            start: new Date(Number(event.start)),
            end: new Date(Number(event.end)),
          }))}
          eventDrop={handleEventUpdate}
          eventResize={handleEventUpdate}
          datesSet={handleDatesSet}
          eventContent={(info) => (
            <Popover>
              <PopoverTrigger className="size-full" asChild>
                <div className="flex w-full flex-col text-start text-xs">
                  <span>
                    {info.event.start?.toLocaleTimeString("ru-RU", {
                      hour: "numeric",
                      minute: "numeric",
                    })}{" "}
                    -{" "}
                    {info.event.end?.toLocaleTimeString("ru-RU", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                  {info.event.title}
                </div>
              </PopoverTrigger>
              <PopoverContent align="center" className="m-0 w-auto p-0">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(info)}
                >
                  Удалить событие
                </Button>
              </PopoverContent>
            </Popover>
          )}
        />
      </div>
    </div>
  );
}

export default GoalsCalendarPage;

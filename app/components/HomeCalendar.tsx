"use client";

import { Event, Shift, Staff } from "@/types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { set } from "react-datepicker/dist/date_utils";

function HomeCalendar({
  schedule,
  events,
  staff,
  timeOff,
  user,
}: {
  schedule: Shift[];
  events: Event[];
  staff: Staff[];
  timeOff: any;
  user: any;
}) {
  const [showEvents, setShowEvents] = useState<boolean>(true);
  const [showSchedule, setShowSchedule] = useState<boolean>(true);
  const [showTimeOff, setShowTimeOff] = useState<boolean>(false);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);

  useEffect(() => {
    setCalendarEvents([
      ...(showSchedule ? schedule : []),
      ...(showEvents ? events : []),
      ...(showTimeOff ? timeOff : []),
    ]);
  }, [showSchedule, showEvents, showTimeOff, schedule, events, timeOff]);

  function handleShowEvents() {
    setShowEvents(!showEvents);
  }
  function handleShowSchedule() {
    setShowSchedule(!showSchedule);
  }
  function handleShowTimeOff() {
    setShowTimeOff(!showTimeOff);
  }

  return (
    <div className="items-start justify-center min-h-screen pb-1">
      <div className="flex justify-end items-center space-y-1">
        <button
          className={`font-bold py-1 px-1.5 rounded-md border-secondary-100 border-2 mt-1 ${
            showEvents ? "bg-main-500" : "bg-main-800"
          } text-secondary-100 hover:bg-main-600 text-xs`}
          onClick={handleShowEvents}
        >
          {showEvents ? "Hide Events" : "Show Events"}
        </button>
        <button
          className={`font-bold py-1 px-1.5 rounded-md border-secondary-100 border-2  ${
            showSchedule ? "bg-main-500" : "bg-main-800"
          } text-secondary-100 hover:bg-main-600 text-xs`}
          onClick={handleShowSchedule}
        >
          {showSchedule ? "Hide Schedule" : "Show Schedule"}
        </button>
        <button
          className={`font-bold py-1 px-1.5 rounded-md border-secondary-100 border-2 ${
            showTimeOff ? "bg-main-500" : "bg-main-800"
          } text-secondary-100 hover:bg-main-600 text-xs`}
          onClick={handleShowTimeOff}
        >
          {showTimeOff ? "Hide Time Off" : "Show Time Off"}
        </button>
      </div>
      <div className="text-sm">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridWeek,dayGridMonth",
          }}
          events={calendarEvents}
          nowIndicator={true}
          editable={false}
          droppable={false}
          selectable={false}
          selectMirror={true}
          defaultAllDay={false}
          displayEventEnd={true}
        />
      </div>
    </div>
  );
}

export default HomeCalendar;

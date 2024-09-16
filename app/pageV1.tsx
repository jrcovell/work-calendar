"use client";

import FullCalendar from "@fullcalendar/react";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Navigation from "./components/Navigation";

type Event = {
  title: string;
  start: Date | string;
  end?: Date | string;
  allDay: boolean;
  display?:
    | "background"
    | "inverse-background"
    | "block"
    | "list-item"
    | "none";
  id: string;
  eventColor?: string;
  notes?: string;
};

// type Shift = {
//   day: Date | string;
//   startTime: Date | string;
//   endTime: Date | string;
//   staff: Staff;
// };
type ShiftType = "Morning" | "Up the Middle" | "Close" | "All Day";

type Schedule = {
  day: Date | string;
  startTime: string;
  type?: ShiftType;
  endTime: string;
  staff: Staff;
};

type Staff = {
  name: string;
  id: number;
  number?: string;
  admin: boolean;
};

const staff: Staff[] = [
  {
    name: "Jake C",
    id: 1,
    number: "123-456-7890",
    admin: true,
  },
  {
    name: "Josh M",
    id: 2,
    number: "123-456-7890",
    admin: true,
  },
  {
    name: "Steve C",
    id: 3,
    number: "123-456-7890",
    admin: false,
  },
  {
    name: "Carter V",
    id: 4,
    number: "123-456-7890",
    admin: false,
  },
];

const schedule: Schedule[] = [
  {
    day: "2024-08-08",
    startTime: "07:00AM",
    type: "Morning",
    endTime: "03:00PM",
    staff: staff[0],
  },
  {
    day: "2024-08-08",
    startTime: "10:00AM",
    endTime: "06:00PM",
    type: "Up the Middle",
    staff: staff[1],
  },
  {
    day: "2024-08-10",
    startTime: "01:00PM",
    endTime: "08:00PM",
    type: "Close",
    staff: staff[1],
  },
];

const events: Event[] = [
  {
    title: "All-day event",
    start: new Date().toISOString().split("T")[0],
    allDay: true,
    id: "1",
    notes: "This is a note",
  },
  {
    title: "Timed event",
    start: "2024-08-08",
    allDay: false,
    id: "2",
    notes: "This is a note 2",
    display: "block",
  },
  {
    title: "Aerification",
    start: "2024-08-12",
    allDay: true,
    end: "2024-08-16",
    id: "3",
    display: "background",
    eventColor: "red",
  },
];

export default function Home() {
  const [currentDay, setCurrentDay] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  console.log(currentDay);

  const handleDateClick = (arg: any) => {
    // console.log(arg);
    // alert(arg.dateStr);
    setCurrentDay(arg.dateStr);
  };

  const handleEventClick = (arg: any) => {
    setModalOpen(true);
    console.log(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    );
  };

  return (
    <div className="grid grid-cols-10 items-start justify-center min-h-screen py-2">
      <div className="col-span-2 ">
        <h1 className="text-2xl font-bold text-center border-b-2 ">Staff</h1>
        <div className="grid grid-cols-1 mt-2">
          {schedule
            .filter((shift) => shift.day === currentDay)
            .map((shift) => (
              <div
                className={`border border-violet-800 ${
                  shift.type === "Morning"
                    ? "bg-lime-600"
                    : shift.type === "Up the Middle"
                    ? "bg-blue-600"
                    : shift.type === "Close"
                    ? "bg-red-600"
                    : "bg-gray-600"
                }`}
                key={shift.staff.id}
              >
                <h2>{shift.staff.name}</h2>
                <p>
                  {shift.startTime} - {shift.endTime}
                </p>
              </div>
            ))}
        </div>
      </div>

      <div className="col-span-6">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          dateClick={handleDateClick}
          // drop={}
          eventClick={handleEventClick}
        />
      </div>
      <div className="col-span-2 mt-2">
        <h1 className="text-2xl font-bold text-center border-b-2 ">Events</h1>
        {events
          .filter((event) => event.start === currentDay)
          .map((event) => (
            <span className="" key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.notes}</p>
            </span>
          ))}
      </div>
    </div>
  );
}

{
  /* {schedule
          .filter((shift) => shift.day === currentDay)
          .map((shift) => (
            <span className="" key={shift.staff.id}>
              <h2>{shift.staff.name}</h2>
              <p>
                {shift.startTime} - {shift.endTime}
              </p>
            </span>
          ))} */
}

{
  /* {events
            .filter((event) => event.start === currentDay)
            .map((event) => (
              <span className="" key={event.id}>
                <h2>{event.title}</h2>
                <p>{event.notes}</p>
              </span>
            ))} */
}

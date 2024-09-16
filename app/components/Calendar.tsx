"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { Event, Settings, Shift, Staff, StaffMenu } from "@/types";
import { addShiftsToServer, addShiftToServer } from "../_lib/actions";
import { EventDropArg } from "@fullcalendar/core/index.js";
import EditModal from "./EditShiftModal";
import { useCalendar } from "../context/CalendarContext";
import { PlusIcon } from "@heroicons/react/24/solid";
import uniqid from "uniqid";

// import copyPastePlugin from "fullcalendar-copy-paste";

export default function Calendar({
  events,
  staff,
  schedule,
  settings,
}: {
  events: Event[];
  staff: Staff[];
  schedule: any[];
  settings: any[];
}) {
  //* lists staff + 3 shift types to be dragged onto calendar
  const [staffMenu, setStaffMenu] = useState<StaffMenu[]>(
    staff.map((staff) => ({
      staff: staff.name,
      id: staff.id,
      color: staff.color,
    }))
  );

  const { shiftBatch, setShiftBatch } = useCalendar(); //* batch of shifts to be added to server
  const { showEdit, setShowEdit } = useCalendar(); //* reveal/hide edit modal
  const { selectedShift, setSelectedShift } = useCalendar(); //* selected shift to edit

  let defaultStart = settings[0].defaultStart.toString().substring(0, 2);
  let defaultEnd = settings[0].defaultEnd.toString().substring(0, 2);
  let defaultMiddle = settings[0].defaultMiddle.toString().substring(0, 2);

  // console.log("defaultStart", defaultStart);
  // console.log("defaultEnd", defaultEnd);
  // console.log("defaultMiddle", defaultMiddle);

  // console.log("STAFF", staff);
  // console.log("SCHEDULE", schedule);
  // console.log("EVENTS", events);

  useEffect(() => {
    const draggableEl = document.getElementById("draggable-el") as HTMLElement;

    if (draggableEl) {
      const draggable = new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let id = eventEl.getAttribute("id");
          let text = eventEl.innerText;
          return {
            text,
            title,
            id,
          };
        },
      });

      return () => draggable.destroy();
    }
  }, []);

  function updateShift(data: EventDropArg) {
    //* When event is dragged to new date
    // console.log(data.oldEvent.start);
    // console.log(shiftBatch[0].start);
    // console.log(data.oldEvent._def.extendedProps.staffId);
    // console.log(shiftBatch[0].staffId);
    const updatedShift: Shift[] = shiftBatch.filter(
      (shift: Shift) =>
        shift.start?.toString().substring(0, 10) ===
          data.oldEvent.start?.toString().substring(0, 10) &&
        shift.staffId === Number(data.oldEvent._def.extendedProps.staffId)
    );
    console.log("UPDATED SHIFT", updatedShift);
    // //* replace dates in selected shift
    updatedShift[0].start = new Date(
      updatedShift[0]?.start?.setDate(
        updatedShift[0].start.getDate() + data.delta.days
      )
    );
    updatedShift[0].end = new Date(
      updatedShift[0].end.setDate(
        updatedShift[0].end.getDate() + data.delta.days
      )
    );
  }
  function addShift(data: DropArg) {
    // console.log("DATA", data.date);
    // console.log("Before", shiftBatch);

    //* DropArg from @fullcalendar/interaction

    const newShift: Shift = {
      start: data.draggedEl.title.startsWith("O")
        ? new Date(data.date.setHours(defaultStart, 0, 0)) //* 6am
        : data.draggedEl.title.startsWith("C")
        ? new Date(data.date.setHours(defaultEnd, 0, 0)) //* 1pm
        : new Date(data.date.setHours(defaultMiddle, 0, 0)), //* 10am

      end: data.draggedEl.title.startsWith("O")
        ? new Date(data.date.setHours(14, 0, 0))
        : data.draggedEl.title.startsWith("C")
        ? new Date(data.date.setHours(20, 0, 0)) //* 8pm
        : new Date(data.date.setHours(17, 0, 0)), //* 5pm

      title: data.draggedEl.title.substring(2),
      staffId: Number(data.draggedEl.id),
      type: data.draggedEl.title.startsWith("O")
        ? "Open"
        : data.draggedEl.title.startsWith("C")
        ? "Close"
        : "Up the Middle",
      borderColor: staffMenu.find(
        (staff) => staff.id === Number(data.draggedEl.id)
      )?.color,
      findId: uniqid(),
    };

    // console.log("NEW SHIFT", newShift); //* {start: Fri Aug 09 10:00:00, end: Fri Aug 09 10:00:00, title: "Op 2", staffId: 2}
    // addShiftToServer(newShift); //* adds single shift to server, better to batch shifts first.

    // console.log(shiftBatch[0]?.start);
    // console.log(newShift.start);

    //* Check if shift already exists in batch
    //! Works, but still adds duplicate shift
    // if (
    //   shiftBatch.some(
    //     (shift: Shift) => shift.start.toString() === newShift.start.toString()
    //   )
    // ) {
    //   alert("SHIFT EXISTS");
    //   return;
    // }

    setShiftBatch([...shiftBatch, newShift]);
    // console.log("After", shiftBatch);
  }

  //* sends batch of shifts to server
  function handleConfirmBatch() {
    console.log("BATCH", shiftBatch);
    addShiftsToServer(shiftBatch);
    setShiftBatch([]);
  }

  //* selects shift to edit, then opens modal
  function handleEditShift(data: any) {
    // console.log("DATA", data);
    setSelectedShift(data);
    setShowEdit(true);
  }

  function handleDeleteShift(data: any) {
    console.log("DATA", data);
    console.log(data.event._def.extendedProps.findId);
    console.log(shiftBatch[0].findId);
    const updatedShifts = shiftBatch.filter(
      (shift: Shift) => shift.findId !== data.event._def.extendedProps.findId
    );
    console.log("UPDATED SHIFTS", updatedShifts);
    setShiftBatch(updatedShifts);
  }

  function handleDeleteBatch() {
    //* clears all shifts from batch (clear batch button)
    setShiftBatch([]);
    setSelectedShift(null);
  }

  return (
    <div className="grid grid-cols-10 items-start ml-5 justify-center min-h-screen py-2">
      <div className="col-span-8 min-h-screen">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          // events={[...schedule]}
          events={shiftBatch ? [...shiftBatch] : []}
          //start:Sat Aug 03 2024 06:00:00 GMT-0400 (Eastern Daylight Time)
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          defaultAllDay={false}
          displayEventEnd={true}
          eventDrop={(data) => updateShift(data)} //* when event is dragged to new date
          drop={(data) => addShift(data)}
          eventClick={handleDeleteShift}
        />
      </div>
      <div className="col-span-2 grid grid-cols-4 ml-2 mt-2" id="draggable-el">
        <div className=" flex border-b-4 border-black col-span-6 space-x-2 justify-center">
          {shiftBatch.length > 0 ? (
            <button
              onClick={handleDeleteBatch}
              className="bg-main-600 text-white px-2 py-2 mt-2 rounded-md mb-1"
            >
              Clear All
            </button>
          ) : null}
          {shiftBatch.length > 0 ? (
            <button
              onClick={handleConfirmBatch}
              className="bg-main-700 text-white px-2 py-2 mt-2 rounded-md mb-1 border border-black "
            >
              Add Shift Batch
            </button>
          ) : null}
        </div>

        <div className="col-span-4 mt-3">
          {staffMenu.map((shift) => (
            <div
              key={shift.id}
              className=" grid grid-cols-8 font-bold border border-slate-200 bg-violet-400 p-1 items-center"
            >
              <span className={`col-span-4 border-r-2 text-slate-800`}>
                {shift.staff}
              </span>
              {/* Open - Middle - Close Shifts  */}

              <span
                id={shift.id.toString()}
                title={"O" + " " + shift.staff}
                className="fc-event col-span-1 border border-3  hover:bg-slate-100  border-zinc-600 bg-lime-500 h-5 w-5 rounded-md mx-1 "
              ></span>
              <span
                id={shift.id.toString()}
                title={"M" + " " + shift.staff}
                className="fc-event col-span-1 border border-3  hover:bg-slate-100  border-zinc-600 bg-blue-500 h-5 w-5 rounded-md mx-1 "
              ></span>
              <span
                id={shift.id.toString()}
                title={"C" + " " + shift.staff}
                className="fc-event col-span-1 border border-3  hover:bg-slate-100  border-zinc-600 bg-red-500 h-5 w-5 rounded-md mx-1 "
              ></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

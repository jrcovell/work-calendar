"use client";

import FullCalendar from "@fullcalendar/react";
import SideBar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import { memo, useEffect, useRef, useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { EventSourceInput } from "@fullcalendar/core/index.js";
import { start } from "repl";
import { getSchedule } from "../_lib/data-access";

type ShiftType = "Open" | "Up the Middle" | "Close" | "All Day";

type Staff = {
  name: string;
  id: number;
  number?: string;
  shiftTypes: ShiftType[];
  admin: boolean;
  color?: string;
};

type Shift = {
  staff: Staff | string;
  title: string;
  id: string | number;
  start?: number | Date;
  end?: number | Date;
  color?: string;
};

// type Event = {
//   title: string;
//   start: Date | string;
//   end?: Date | string;
//   allDay: boolean;
//   display?:
//     | "background"
//     | "inverse-background"
//     | "block"
//     | "list-item"
//     | "none";
//   id: string;
//   eventColor?: string;
//   notes?: string;
// };
const events2 = [];

const events = [
  {
    title: "RC Day",
    start: new Date().toISOString().split("T")[0],
    allDay: true,
    id: "1",
    notes: "This is a note",
  },
  {
    title: "Timed event",
    start: "2024-08-12",
    allDay: false,
    id: "2",
    notes: "This is a note 2",
  },
  {
    title: "Aerification",
    start: "2024-08-12",
    allDay: true,
    end: "2024-08-17",
    id: "3",
    display: "background",
    eventColor: "red",
  },
  { title: "asrt", allDay: false, id: 1723160619484, start: "2024-08-09" },
];

const staff: Staff[] = [
  {
    name: "Josh M",
    id: 2,
    number: "123-456-7890",
    shiftTypes: ["Close"],
    admin: true,
    color: "bg-cyan-500",
  },
  {
    name: "Timmy B",
    id: 5,
    number: "123-456-7890",
    shiftTypes: ["Open"],
    admin: true,
    color: "bg-yellow-500",
  },
  {
    name: "Steve C",
    id: 3,
    number: "123-456-7890",
    shiftTypes: ["Open", "Close", "Up the Middle"],
    admin: false,
    color: "bg-rose-500",
  },
  {
    name: "Sam K",
    id: 4,
    number: "123-456-7890",
    shiftTypes: ["Open", "Close", "Up the Middle"],
    admin: true,
    color: "bg-blue-500",
  },
  {
    name: "Jake C",
    id: 1,
    number: "123-456-7890",
    shiftTypes: ["Open"],
    admin: true,
    color: "bg-emerald-500",
  },
  {
    name: "Carter V",
    id: 6,
    number: "123-456-7890",
    shiftTypes: ["Open", "Close", "Up the Middle"],
    admin: false,
    color: "bg-lime-500",
  },
];

// const shifts: Shift[] = [
//   {
//     staff: staff[0],
//     type: "Morning",
//     id: 1,
//     color: "violet-100",
//   },

//   {
//     staff: staff[0],
//     type: "Up the Middle",
//     id: 2,
//     color: "violet-300",
//   },
//   {
//     staff: staff[1],
//     type: "Close",
//     id: 3,
//     color: "violet-500",
//   },
// ];

export default async function Page() {
  const schedule = await getSchedule();
  const [shifts, setShifts] = useState<Shift[]>(
    staff.map((staff, i) => ({
      staff: staff.name,
      title: "Open",
      id: i + "O",
      color: staff.color,
    }))
  );

  const [morningShifts, setMorningShifts] = useState<Shift[]>(
    staff
      .filter((staff) => staff.shiftTypes.includes("Open"))
      .map((staff, i) => ({
        staff: staff.name,
        title: "Open",
        id: i + "O",
        color: staff.color,
      }))
  );

  const [upTheMiddleShifts, setUpTheMiddleShifts] = useState<Shift[]>(
    staff
      .filter((staff) => staff.shiftTypes.includes("Up the Middle"))
      .map((staff, i) => ({
        staff: staff.name,
        title: "Up the Middle",
        id: staff.id + "U",
        color: staff.color,
      }))
  );

  const [closeShifts, setCloseShifts] = useState<Shift[]>(
    staff
      .filter((staff) => staff.shiftTypes.includes("Close"))
      .map((staff, i) => ({
        staff: staff.name,
        title: "Close",
        id: staff.id + "C",
        color: staff.color,
      }))
  );

  // {
  //   staff: staff[0],
  //   title: "Morning",
  //   id: 1,
  // },

  // {
  //   staff: staff[0],
  //   title: "Up the Middle",
  //   id: 2,
  // },
  // {
  //   staff: staff[1],
  //   title: "Close",
  //   id: 3,
  // },
  // {
  //   staff: staff[2],
  //   title: "Morning",
  //   id: 4,
  // },
  // {
  //   staff: staff[3],
  //   title: "Up the Middle",
  //   id: 5,
  // },
  // {
  //   staff: staff[1],
  //   title: "Close",
  //   id: 6,
  // },
  // ]);

  const [allShifts, setAllShifts] = useState<Shift[]>([]);
  const [allEvents, setAllEvents] = useState<
    { title: any; start: Date | null; allDay: boolean; id: number }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newShift, setNewShift] = useState<Shift>({
    staff: "",
    title: "",
    id: 0,
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    allDay: false,
    id: 0,
  });

  // useEffect(() => {
  //   setAllEvents(events);
  // }, []);

  useEffect(() => {
    // let draggableEl = document.getElementById("draggable-el");

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

  // function handleDateClick(data) {
  //   console.log("data", data);
  //   console.log(data.dateStr);
  //   // const newShift = {
  //   //   ...newShift,
  //   //   start: data.date,
  //   //   end: data.date,
  //   // };
  //   setShowEditModal(true);
  // }

  function handleAddEvent(formData: any) {
    console.log(formData);
    // setShowAddModal(true);
    const title = formData.get("title");
    const allDay = formData.get("allDay") ? true : false;
    const start = selectedDate;
    const event = {
      ...newEvent,
      title,
      start,
      allDay,
      id: new Date().getTime(),
    };
    console.log(event);
    // const id = formData.get("id");
    // const text = formData.get("text");
    // const event = {
    setAllEvents([...allEvents, event]);
    setShowAddModal(false);
  }

  function handleAddShift(formData: any) {
    console.log(formData);

    const title = formData.get("type");
    const staff = formData.get("staff");
    const start = formData.get("date");
    const start2 = formData.get("date");
    const start3 = new Date(start2);
    const start4 = start3.setDate(start3.getDate() + 1);
    // console.log(start4);
    const start5 = new Date(start4);
    // console.log(new Date(start));
    // console.log(new Date(start4).setHours(6, 0, 0, 0));

    const shift = {
      ...newShift,
      title: title.charAt(0) + " " + staff,
      // start: start4,
      start: title.startsWith("Open")
        ? start5.setHours(6, 0, 0, 0)
        : title.startsWith("Up the Middle")
        ? start5.setHours(10, 0, 0, 0)
        : start5.setHours(13, 0, 0, 0),
      end: title.startsWith("Open")
        ? start5.setHours(14, 0, 0, 0)
        : title.startsWith("Up the Middle")
        ? start5.setHours(17, 0, 0, 0)
        : start5.setHours(20, 0, 0, 0),
      id: new Date().getTime(),
    };
    console.log(shift);
    setAllShifts([...allShifts, shift]);
    setShowEditModal(false);
  }

  function addShift(data: DropArg) {
    // console.log("DATA", data);
    //* DropArg from @fullcalendar/interaction
    console.log(data);

    const shift = {
      ...newShift,
      start: data.draggedEl.title.startsWith("Open")
        ? data.date.setHours(6, 0, 0, 0)
        : data.draggedEl.title.startsWith("Up the Middle")
        ? data.date.setHours(10, 0, 0, 0)
        : data.draggedEl.title.startsWith("Close")
        ? data.date.setHours(13, 0, 0, 0)
        : data.date,
      // startTime: "08:00",
      end: data.draggedEl.title.startsWith("Open")
        ? data.date.setHours(14, 0, 0, 0)
        : data.draggedEl.title.startsWith("Up the Middle")
        ? data.date.setHours(17, 0, 0, 0)
        : data.draggedEl.title.startsWith("Close")
        ? data.date.setHours(20, 0, 0, 0)
        : data.date,

      title: data.draggedEl.title.substring(0, 2) + " " + data.draggedEl.id,
      staff: data.draggedEl.id,
      id: new Date().getTime(),
      backgroundColor: data.draggedEl.title.startsWith("Open")
        ? "green"
        : data.draggedEl.title.startsWith("Up the Middle")
        ? "violet"
        : "red",
    };
    // console.log(data.draggedEl.title === "Morning" ? "09:00" : "12:00");
    console.log(shift);
    setAllShifts([...allShifts, shift]);
    console.log(allShifts);
  }

  function handleDeleteModal(data = { event: { _def: { publicId: 0 } } }) {
    console.log(data.event._def.publicId);
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event._def.publicId));
  }

  // function handleEventModal(data) {
  //   console.log(data);
  //   setShowAddModal(true);
  // }

  function handleDelete() {
    setAllShifts(
      allShifts.filter((shift) => Number(shift.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  function handleModalClose() {
    setShowModal(false);
    setNewShift({ ...newShift, type: "", id: 0 });
    setShowDeleteModal(false);

    setIdToDelete(null);
  }
  //* save draggable events to shifts array
  // console.log(shifts);
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
          events={schedule}
          nowIndicator={true}
          editable={false}
          droppable={true}
          selectable={true}
          selectMirror={true}
          defaultAllDay={false}
          //   eventReceive={(info) => {
          //     console.log(info);
          //   }}
          // dateClick={(data) => {
          //   handleEventModal(data);
          //   setSelectedDate(data.dateStr);
          // }}
          drop={(data) => addShift(data)}
          // eventClick={(data) =>
          //   handleDeleteModal({
          //     event: { _def: { publicId: parseInt(data.event._def.publicId) } },
          //   })
          // }
        />
      </div>

      <div className="col-span-2 grid grid-cols-4 ml-2 mt-2" id="draggable-el">
        <div className="col-span-4 mt-3">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="grid grid-cols-8 font-bold border border-purple-900 p-1 items-center"
            >
              <span className="col-span-4 border-r-2">
                {shift.staff.toString()}
              </span>

              <span
                id={shift.staff.toString()}
                title={"Open" + " " + shift.staff}
                className="fc-event col-span-1 border border-3  hover:bg-slate-100  border-zinc-600 bg-lime-500 h-5 w-5 rounded-md mx-1 "
              ></span>

              <span
                id={shift.staff.toString()}
                title={"Up the Middle" + " " + shift.staff}
                className="fc-event px-1 col-span-1 border border-3 hover:bg-slate-100 border-zinc-600 bg-red-500 h-5 w-5 rounded-md mx-1"
              ></span>

              <span
                id={shift.staff.toString()}
                title={"Close" + " " + shift.staff}
                className="fc-event col-span-1 border border-3 hover:bg-slate-100 border-zinc-600 bg-blue-500 h-5 w-5 rounded-md mx-1"
              ></span>
              <span className="border rounded-lg border-purple-400 px-1">
                {allShifts.filter((s) => s.staff === shift.staff).length}
              </span>
            </div>
          ))}
        </div>

        {/* <div className="col-span-1">
          {morningShifts.map((shift) => (
            <div
              className={`fc-event border border-violet-800
                ${shift.color} font-bold text-white p-1`}
              id={shift.staff.toString()}
              key={shift.id}
              title={shift.title + " " + shift.staff}
            >
              <h2>{shift.staff.toString()}</h2>
              <h2>{shift.title}</h2>
            </div>
          ))}
        </div>

        <div className="col-span-1">
          {upTheMiddleShifts.map((shift) => (
            <div
              className={`fc-event border border-violet-800
                            ${shift.color} font-bold text-white p-1`}
              id={shift.staff.toString()}
              key={shift.id}
              title={shift.title + " " + shift.staff}
            >
              <div className="">
                <h2>{shift.staff.toString()}</h2>

                <h2>{shift.title}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-2">
          {closeShifts.map((shift) => (
            <div
              className={`fc-event border border-violet-800
                            ${shift.color} font-bold text-white p-1`}
              id={shift.staff.toString()}
              key={shift.id}
              title={shift.title + " " + shift.staff}
            >
              <h2>{shift.staff.toString()}</h2>

              <h2>{shift.title}</h2>
            </div>
          ))}
        </div> */}

        {/* <div className="col-span-2">
          {shifts
            .filter((shift) => shift.title === "Close")
            .map((shift) => (
              <div
                className="fc-event border border-violet-800
              bg-violet-900 font-bold text-white"
                id={shift.staff.name}
                key={shift.id}
                title={shift.title + " " + shift.staff.name}
              >
                <h2>{shift.staff.name}</h2>

                <h2>{shift.title}</h2>
              </div>
            ))} */}
        {/* </div> */}
      </div>

      <Transition show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                  <div className="bg-white px-4">
                    <div className="flex items-center justify-between">
                      <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Delete Shift
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this shift?
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="bg-red-600 text-white px-4 py-2 mt-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>

                    <button
                      type="button"
                      className="bg-gray-600 text-white px-4 py-2 mt-2"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* //* */}

      <Transition show={showEditModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowEditModal}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                  <div className="bg-white px-4">
                    <div className="flex items-center justify-between">
                      <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Create Shift
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to create this shift?
                        </p>
                      </div>
                      <form action={handleAddShift}>
                        <div className="flex flex-col mt-4">
                          <label htmlFor="staff">Staff</label>
                          <select
                            name="staff"
                            id="staff"
                            className="border border-gray-300 rounded-md p-2"
                          >
                            {staff.map((staff) => (
                              <option key={staff.id} value={staff.name}>
                                {staff.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label htmlFor="type">Type</label>
                          <select
                            name="type"
                            id="type"
                            className="border border-gray-300 rounded-md p-2"
                          >
                            <option value="Open">Open</option>
                            <option value="Up the Middle">Up the Middle</option>
                            <option value="Close">Close</option>
                          </select>
                        </div>
                        <div className="flex flex-col mt-4">
                          <label htmlFor="date">Date</label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>

                        {/* <input type="hidden" name="date" value={} /> */}
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-4 py-2 mt-2"
                        >
                          Add
                        </button>
                      </form>
                    </div>

                    <button
                      type="button"
                      className="bg-gray-600 text-white px-4 py-2 mt-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* //// */}

      <Transition show={showAddModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowAddModal}>
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                  <div className="bg-white px-4">
                    <div className="flex items-center justify-between">
                      <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Create Event
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to create this shift?
                        </p>
                      </div>
                      <form action={handleAddEvent}>
                        <div className="flex flex-col mt-4">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <label htmlFor="allDay">All Day Event</label>
                          <input
                            type="checkbox"
                            name="allDay"
                            id="allDay"
                            className="border border-gray-300 rounded-md p-2"
                          />
                        </div>

                        {/* <input type="hidden" name="date" value={} /> */}
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-4 py-2 mt-2"
                        >
                          Add
                        </button>
                      </form>
                    </div>

                    <button
                      type="button"
                      className="bg-gray-600 text-white px-4 py-2 mt-2"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

{
  /*   <div className="col-span-2">
        <h1 className="text-2xl font-bold text-center border-b-2 ">Staff</h1>
        <div id="staff" className="grid grid-cols-1 mt-2">
          {staff.map((staff) => (
            <div
              className={`fc-event border border-violet-800 ${
                staff.admin ? "bg-lime-600" : "bg-gray-600"
              }`}
              key={staff.id}
            >
              <h2>{staff.name}</h2>
              {/* <p>{staff.number}</p> */
}
//       </div>
//     ))}
//   </div>
// </div>
// */}

{
  /* <div className="col-span-1 mt-2">
{shifts
  .filter((shift) => shift.type === "Morning")
  .map((shift) => (
    <div
      className="border border-violet-200
        bg-violet-100 p-0.5"
      key={shift.staff.id}
    >
      <h2>{shift.staff.name}</h2>
      <p>{shift.type}</p>
    </div>
  ))}
</div>
<div className="col-span-1 mt-2">
{shifts
  .filter((shift) => shift.type === "Up the Middle")
  .map((shift) => (
    <div
      className="border border-violet-500
        bg-violet-600"
      key={shift.staff.id}
    >
      <h2>{shift.staff.name}</h2>
      <p>{shift.type}</p>
    </div>
  ))}
</div> */
}

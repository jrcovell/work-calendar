"use client";

import { Event, Shift, Staff } from "@/types";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import { useCalendar } from "../context/CalendarContext";
import AddShiftModal from "./AddShiftModal";
import EditModal from "./EditShiftModal";
import Modal from "../components/Modal";
import { EventClickArg } from "@fullcalendar/core/index.js";
import EditShiftForm from "./EditShiftForm";
import AddShiftForm from "./AddShiftForm";
import { useOptimistic } from "react";

function CalendarView({
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
  const { showAdd, setShowAdd } = useCalendar();
  const { selectedDate, setSelectedDate } = useCalendar();
  // const { selectedStaff, setSelectedStaff } = useCalendar();
  const { showEdit, setShowEdit } = useCalendar();
  const { selectedShift, setSelectedShift } = useCalendar();
  //

  const selectedStaff = selectedShift?.event._def.title;
  //* formatting for edit shift modal title
  const selectedDate2 = selectedShift?.event._instance.range.start
    .toString()
    .substring(0, 4);

  function handleAddShift(data: DropArg) {
    // console.log("data", data);
    setSelectedDate(data.dateStr);
    setShowAdd(true);
  }

  function handleEditShift(data: DropArg) {
    // console.log("DATA", data);
    setSelectedShift(data);
    setShowEdit(true);
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridWeek,dayGridMonth",
        }}
        events={[...schedule]}
        nowIndicator={true}
        editable={false}
        droppable={false}
        eventClick={user.admin ? (data) => handleEditShift(data) : null}
        dateClick={user.admin ? (data) => handleAddShift(data) : null}
        selectable={false}
        selectMirror={true}
        defaultAllDay={false}
        displayEventEnd={true}
      />

      {/* Add Shift Modal */}
      <Modal
        show={showAdd}
        onClose={setShowAdd}
        title={`Add Shift for ${selectedDate}.`}
      >
        <AddShiftForm staff={staff} />
      </Modal>
      {/* <Edit Shift Modal/> */}
      <Modal
        show={showEdit}
        onClose={setShowEdit}
        title={`Edit Shift: ${selectedStaff} on ${selectedDate2}`}
      >
        <EditShiftForm staff={staff} />
      </Modal>
    </div>
  );
}

export default CalendarView;

{
  /* V1 Modal Format  */
}
{
  /* <AddShiftModal staff={staff} /> */
}

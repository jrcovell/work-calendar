"use client";

import { useCalendar } from "../context/CalendarContext";
import AddEventForm from "./AddEventForm";
import Modal from "./Modal";

function EventUI({ events }: { events: any }) {
  const { showAddEvent, setShowAddEvent } = useCalendar();

  return (
    <>
      <div className="flex space-x-5">
        <h2 className=" font-semibold text-3xl">Event List</h2>
        <button
          onClick={() => setShowAddEvent(true)}
          className="font-bold py-2 px-4 rounded border-secondary-100 border-2 bg-main-500 text-secondary-100 hover:bg-main-600"
        >
          Add Event
        </button>
      </div>
      <Modal show={showAddEvent} onClose={setShowAddEvent} title="Add Event">
        <AddEventForm events={events} />
      </Modal>
    </>
  );
}

export default EventUI;

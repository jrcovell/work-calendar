"use client";

import { useFormStatus } from "react-dom";
import { deleteEventFromServer } from "../_lib/actions";
import { useCalendar } from "../context/CalendarContext";

function DeleteEventButton({ id }: { id: number }) {
  const { setShowEditEvent } = useCalendar();
  const { pending } = useFormStatus();

  pending ? setShowEditEvent(false) : null;

  return (
    <form action={deleteEventFromServer}>
      <input type="hidden" name="id" value={id} />
      <button
        className="bg-red-800 border border-red-500 rounded-md
                   px-6 py-2 text-slate-200 font-semibold hover:bg-red-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      >
        <span>Delete Event</span>
      </button>
    </form>
  );
}

export default DeleteEventButton;

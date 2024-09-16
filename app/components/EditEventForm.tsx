import { useFormStatus } from "react-dom";
import FormButton from "./FormButton";
import { useCalendar } from "../context/CalendarContext";
import { deleteEventFromServer, editEventToServer } from "../_lib/actions";
import { useEffect, useState, useTransition } from "react";

function EditEventForm({ event }: { event: any | null }) {
  const { title, date, start, end, allDay, backgroundColor, id } = event || {};

  const [allDayEdit, setAllDayEdit] = useState(allDay);
  const startTime = new Date(start).toTimeString().substring(0, 5);
  const endTime = new Date(end).toTimeString().substring(0, 5);
  const { setShowEditEvent } = useCalendar();
  const { pending } = useFormStatus();

  return (
    <>
      <form action={editEventToServer}>
        <div className="mb-4 gap-4 p-5 space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={title}
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={date}
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />

          <label
            htmlFor="start"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="time"
            name="start"
            disabled={allDayEdit ? true : false}
            defaultValue={startTime}
            id="start"
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />

          <label
            htmlFor="end"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            type="time"
            name="end"
            disabled={allDayEdit ? true : false}
            defaultValue={endTime}
            id="end"
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            step={3600} // Set step to 3600 seconds (1 hour)
          />
          <label
            htmlFor="allDay"
            className="block text-sm font-medium text-gray-700"
          >
            All Day Event?
          </label>
          <input
            onChange={() => setAllDayEdit(!allDayEdit)}
            type="checkbox"
            name="allDay"
            checked={allDayEdit}
            id="allDay"
            value={allDayEdit}
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          />
          <input type="hidden" name="backgroundColor" value={backgroundColor} />
          <input type="hidden" name="id" value={id} />
        </div>

        <div className="flex justify-center mb-2 mt-2 items-center space-x-1">
          {/* <Button /> */}
          <button
            className="bg-violet-800 border border-violet-500 rounded-md
                   px-6 py-2 text-slate-200 font-semibold hover:bg-violet-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
            type="submit"
            onClick={() => setShowEditEvent(false)}
            disabled={pending}
          >
            Edit Event
          </button>
        </div>
      </form>
      <div className="flex justify-center mb-2 mt-2 items-center space-x-1">
        <DeleteEventButton id={event?.id} />
      </div>
    </>
  );
}

// function Button() {
//   const { setShowEditEvent } = useCalendar();
//   const { pending } = useFormStatus();

//   pending ? setShowEditEvent(false) : null;

//   return (
//     <FormButton
//       pendingLabel="Editing Event..."
//       className="bg-violet-800 border border-violet-500 rounded-md
//                    px-6 py-2 text-slate-200 font-semibold hover:bg-violet-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//     >
//       Edit Event
//     </FormButton>
//   );
// }

function DeleteEventButton({ id }: { id: number }) {
  const { setShowEditEvent } = useCalendar();
  const { pending } = useFormStatus();

  // pending ? setShowEditEvent(false) : null;

  return (
    <form action={deleteEventFromServer}>
      <input type="hidden" name="id" value={id} />
      <button
        className="bg-red-800 border border-red-500 rounded-md
                   px-6 py-2 text-slate-200 font-semibold hover:bg-red-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
        onClick={() => setShowEditEvent(false)}
      >
        <span>Delete Event</span>
      </button>
    </form>
  );
}

export default EditEventForm;

//   console.log(start, "start"); // 2024-08-29T17:00:00+00:00
// convert to 17:00
//   console.log("event", event);
//   const convertedEnd = new Date(end).getTime() + 4 * 60 * 60 * 1000;
//   console.log(convertedEnd, "convertedEnd");
//   //convert start to just time
//   const convertedStart = new Date(start).toString().substring(16, 21);
//   console.log(convertedStart, "convertedStart");
// console.log("startc", start);
// remove seconds "09:00"

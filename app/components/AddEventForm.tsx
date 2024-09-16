import { useFormStatus } from "react-dom";
import { useCalendar } from "../context/CalendarContext";
import FormButton from "./FormButton";
import { addEventToServer } from "../_lib/actions";
import { useState } from "react";

function AddEventForm({ events }: { events: any }) {
  const [allDay, setAllDay] = useState(false);

  return (
    <form action={addEventToServer}>
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
          disabled={allDay ? true : false}
          defaultValue={"13:00"}
          id="start"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          step={3600} // Set step to 3600 seconds (1 hour)
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
          disabled={allDay ? true : false}
          defaultValue={"20:00"}
          id="end"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          step={3600} // Set step to 3600 seconds (1 hour)
        />
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700"
        >
          Event Type
        </label>
        <select
          id="type"
          name="type"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          <option value="junior">Junior</option>
          <option value="ladies">Ladies</option>
          <option value="mens">Mens</option>
          <option value="seniors">Seniors</option>
          <option value="task">Job Task</option>
          <option value="outing">Outing</option>
        </select>

        <label
          htmlFor="allDay"
          className="block text-sm font-medium text-gray-700"
        >
          All Day Event?
        </label>
        <input
          onChange={() => setAllDay(!allDay)}
          type="checkbox"
          name="allDay"
          id="allDay"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-center mb-2 mt-5 items-center space-x-1">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { setShowAddEvent } = useCalendar();
  const { pending } = useFormStatus();

  pending ? setShowAddEvent(false) : null;

  return (
    <FormButton
      pendingLabel="Adding Employee..."
      className="bg-violet-800 border border-violet-500 rounded-md
               px-6 py-2 text-slate-200 font-semibold hover:bg-violet-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Add Event
    </FormButton>
  );
}

export default AddEventForm;

"use client";
import { useFormStatus } from "react-dom";
import { Staff } from "@/types";
import { addShiftToServer } from "../_lib/actions";
import FormButton from "../components/FormButton";
import { useCalendar } from "../context/CalendarContext";
import { use, useEffect, useState } from "react";
import { set } from "react-datepicker/dist/date_utils";
import toast from "react-hot-toast";
function AddShiftForm({ staff }: { staff: Staff[] }) {
  const { selectedDate } = useCalendar();
  const { showAdd, setShowAdd } = useCalendar();

  const { pending } = useFormStatus();

  // set setShowAdd to false when cache is revalidated

  async function addShift(formData: any) {
    const result = await addShiftToServer(formData);
    setShowAdd(false);
    if (result) {
      toast.success("Shift Added");
    }
  }

  return (
    <form action={addShift}>
      <div className="space-y-2">
        <input type="hidden" name="type" value="Custom" />
        <input type="hidden" name="date" value={selectedDate} />

        <label
          htmlFor="staff"
          className="block text-sm font-medium text-gray-700"
        >
          Staff
        </label>
        <select
          id="staff"
          name="staff"
          autoComplete="staff"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        >
          {staff.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>

        <label
          htmlFor="start"
          className="block text-sm font-medium text-gray-700"
        >
          Start Time
        </label>
        <input
          type="time"
          name="start"
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
          defaultValue={"20:00"}
          id="end"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          step={3600} // Set step to 3600 seconds (1 hour)
        />
      </div>
      <div className="flex justify-center mb-2 mt-5 items-center space-x-1">
        {/* <Button />
         */}
        <button
          className="bg-violet-800 border border-violet-500 rounded-md
                   px-6 py-2 text-slate-200 font-semibold hover:bg-violet-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          type="submit"
          onClick={() => setShowAdd(false)}
          disabled={pending}
        >
          Add Shift
        </button>
      </div>
    </form>
  );
}

function Button() {
  // const { setShowAdd } = useCalendar();
  const { pending } = useFormStatus();

  // pending ? setShowAdd(false) : null;

  return (
    <FormButton
      pendingLabel="Adding Shift..."
      className="bg-violet-800 border border-violet-500 rounded-md
       px-6 py-2 text-slate-200 font-semibold hover:bg-violet-800 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Add Shift
    </FormButton>
  );
}

export default AddShiftForm;

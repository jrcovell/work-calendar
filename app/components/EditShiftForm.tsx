"use client";

import { useFormStatus } from "react-dom";
import { deleteShiftFromServer, editShiftToServer } from "../_lib/actions";
import FormButton from "../components/FormButton";
import { useCalendar } from "../context/CalendarContext";
import { Staff } from "@/types";
import { set } from "react-datepicker/dist/date_utils";
import toast from "react-hot-toast";

function EditShiftForm({ staff }: { staff: Staff[] }) {
  const { selectedShift } = useCalendar();
  const { setShowEdit } = useCalendar();

  const shiftId = selectedShift?.event._def.publicId;
  const defaultStart = new Date(
    selectedShift?.event._instance.range.start.getTime() + 4 * 60 * 60 * 1000
  )
    .toString()
    .substring(16, 21);
  const defaultEnd = new Date(
    selectedShift?.event._instance.range.end.getTime() + 4 * 60 * 60 * 1000
  )
    .toString()
    .substring(16, 21);

  async function editShift(formData: any) {
    const result = await editShiftToServer(formData);
    setShowEdit(false);
    if (result) {
      toast.success("Shift Updated");
    }
  }

  return (
    <>
      <form action={editShift}>
        <div className="space-y-2">
          <input type="hidden" name="id" value={shiftId} />
          <input
            type="hidden"
            name="date"
            value={selectedShift?.event._instance.range.start}
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
            defaultValue={defaultStart}
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
            defaultValue={defaultEnd}
            id="end"
            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            step={3600} // Set step to 3600 seconds (1 hour)
          />
        </div>
        <div className=" flex justify-center mb-2 mt-5 items-center space-x-1">
          <Button />
        </div>
      </form>
      <form action={deleteShiftFromServer}>
        <input type="hidden" name="id" value={shiftId} />
        <div className=" flex justify-center mb-2 mt-2 items-center space-x-1">
          <DeleteButton />
        </div>
      </form>
    </>
  );
}

function Button() {
  const { pending } = useFormStatus();
  // const { setShowEdit } = useCalendar();

  // pending ? setShowEdit(false) : null;

  return (
    <FormButton
      pendingLabel="Editing Shift..."
      className="bg-violet-600 border border-violet-500 rounded-md
      px-6 py-2 text-slate-200 font-semibold hover:bg-violet-800 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Edit Shift
    </FormButton>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();
  const { setShowEdit } = useCalendar();

  pending ? setShowEdit(false) : null;
  return (
    <FormButton
      pendingLabel="Deleting Shift..."
      className="bg-red-700 border border-red-500 rounded-md
      px-6 py-2 text-slate-200 font-semibold hover:bg-red-900 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Delete Shift
    </FormButton>
  );
}

export default EditShiftForm;

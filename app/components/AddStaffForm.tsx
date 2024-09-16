"use client";
import { useFormState, useFormStatus } from "react-dom";
import { Staff } from "@/types";
import { TimePicker } from "react-time-picker";
import { addShiftToServer, addStaffToServer } from "../_lib/actions";
import FormButton from "../components/FormButton";
import { useCalendar } from "../context/CalendarContext";
import { use, useEffect, useState } from "react";
function AddStaffForm() {
  const { showAddStaff, setShowAddStaff } = useCalendar();

  const { pending } = useFormStatus();

  return (
    <form action={addStaffToServer}>
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Staff
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
        <label
          htmlFor="color"
          className="block text-sm font-medium text-gray-700"
        >
          Color
        </label>
        <input
          type="color"
          name="color"
          id="color"
          className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
        />
        <label
          htmlFor="admin"
          className="block text-sm font-medium text-gray-700"
        >
          Admin?
        </label>
        <input
          type="checkbox"
          name="admin"
          id="admin"
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
  const { setShowAddStaff } = useCalendar();
  const { pending } = useFormStatus();

  pending ? setShowAddStaff(false) : null;

  return (
    <FormButton
      pendingLabel="Adding Employee..."
      className="bg-violet-800 border border-violet-500 rounded-md
       px-6 py-2 text-slate-200 font-semibold hover:bg-violet-500 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Add Employee
    </FormButton>
  );
}

export default AddStaffForm;

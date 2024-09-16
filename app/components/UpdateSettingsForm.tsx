"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
// import { updateProfileAction } from "../_lib/actions";
import FormButton from "./FormButton";
import { Settings } from "@/types";
import { updateSettings } from "../_lib/actions";
import toast from "react-hot-toast";

//* client component rendering a server component (SelectCountry)

function UpdateSettingsForm({ settings }: { settings: any }) {
  useFormStatus();

  const { defaultStart, defaultEnd, defaultMiddle } = settings[0];

  // async function updateSettingsClient(formData: any) {
  //   const result = await updateSettings(formData);
  //   if (result) {
  //     toast.success("Settings updated successfully");
  //   }
  // }

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateSettings}
    >
      <div className="space-y-2">
        <label>Default Open Shift Time:</label>
        <input
          name="defaultStart"
          type="time"
          defaultValue={defaultStart}
          className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Default Close Shift Time:</label>
        <input
          name="defaultEnd"
          type="time"
          defaultValue={defaultEnd}
          className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Default Middle Shift Time:</label>
        <input
          name="defaultMiddle"
          type="time"
          defaultValue={defaultMiddle}
          className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <FormButton
      pendingLabel="Updating Settings..."
      className="bg-violet-500 border rounded-md
       px-8 py-4 text-slate-200 font-semibold hover:bg-violet-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Update Settings
    </FormButton>
  );
}

export default UpdateSettingsForm;

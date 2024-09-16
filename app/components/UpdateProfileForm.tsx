"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
// import { updateProfileAction } from "../_lib/actions";
import FormButton from "./FormButton";
import { updateProfile } from "../_lib/actions";
import toast from "react-hot-toast";

//* client component rendering a server component (SelectCountry)

function UpdateProfileForm({ staff }: { staff: any }) {
  const [count, setCount] = useState();

  //* useFormStatus is a custom hook that will handle the form status (loading, error, success) (must be used in the form component)
  useFormStatus();

  //   const { fullName, email, memberNumber } = golfer;
  //! name attribute is required for the server action to work
  //* cannot write server actions in client components, so option 2 is to have a standalone module. (actions.js)

  async function updateProfileClient(formData: any) {
    const result = await updateProfile(formData);
    console.log("result", result);
    if (result) {
      toast.success("Profile Updated");
    }
  }

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateProfileClient}
    >
      <div className="space-y-2">
        <label>Display Name:</label>
        <input
          name="fullName"
          defaultValue={staff.name}
          className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address:</label>
        <input
          name="email"
          defaultValue={staff.email}
          className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Phone Number:</label>
        <input
          name="phone"
          defaultValue={staff.phone}
          className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="space-y-2">
        <label>Color:</label>
        <input
          name="color"
          type="color"
          defaultValue={staff.color}
          className="ml-2 bg-primary-200 text-primary-800 w-half"
        />

        <input type="hidden" name="id" value={staff.id} />
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
      pendingLabel="Updating Profile..."
      className="bg-violet-500 border rounded-md
       px-8 py-4 text-slate-200 font-semibold hover:bg-violet-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      Update Profile
    </FormButton>
  );
}

export default UpdateProfileForm;

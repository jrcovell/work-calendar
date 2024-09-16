"use client";

// import { useState } from "react";
// import { useFormStatus } from "react-dom";
// import { updateProfileAction } from "../_lib/actions";
// import FormButton from "./FormButton";

// //* client component rendering a server component (SelectCountry)

// function UpdateProfileForm({ golfer, children }) {
//   const [count, setCount] = useState();

//   //* useFormStatus is a custom hook that will handle the form status (loading, error, success) (must be used in the form component)
//   useFormStatus();

//   const { fullName, email, memberNumber } = golfer;
//   //! name attribute is required for the server action to work
//   //* cannot write server actions in client components, so option 2 is to have a standalone module. (actions.js)
//   return (
//     <form
//       className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
//       action={updateProfileAction}
//     >
//       <div className="space-y-2">
//         <label>Full name</label>
//         <input
//           name="fullName"
//           defaultValue={fullName}
//           className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <label>Email address</label>
//         <input
//           name="email"
//           defaultValue={email}
//           className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="space-y-2">
//         <label>Member Number</label>
//         <input
//           name="memberNumber"
//           disabled
//           defaultValue={memberNumber}
//           className="border border-accent-0 rounded-md px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
//         />
//       </div>

//       <div className="flex justify-end items-center gap-6">
//         <Button />
//       </div>
//     </form>
//   );
// }

// function Button() {
//   const { pending } = useFormStatus();

//   return (
//     <FormButton
//       pendingLabel="Updating Profile..."
//       className="bg-accent-500 border border-accent-0 rounded-md
//        px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//       disabled={pending}
//     >
//       Update Profile
//     </FormButton>
//   );
// }

// export default UpdateProfileForm;

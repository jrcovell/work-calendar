import Link from "next/link";

import SignOutButton from "./SignOutButton";
import { auth } from "../_lib/auth";

import AdminDropdown from "./AdminDropdown";
import { useParams, useSearchParams } from "next/navigation";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 mt-2 text-xl border-b-4 border-main-800">
      <ul className="flex sm:gap-2 items-center justify-between mx-5 mb-2 sm:text-sm  md:text-base">
        <li>
          <Link
            href="/"
            className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/schedule"
            className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
          >
            Schedule
          </Link>
        </li>
        <li>
          <Link
            href="/batchAdd"
            className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
          >
            Batch Add
          </Link>
        </li>

        <li>
          <Link
            href="/staff"
            className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
          >
            Staff{" "}
          </Link>
        </li>
        <li>
          <Link
            href="/events"
            className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
          >
            Settings
          </Link>
        </li>

        {session?.user?.image ? (
          <li>
            <Link
              href="/profile"
              className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap pl-2 pr-8 font-bold"
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-7 rounded-full"
                //* sometimes needed by google
                referrerPolicy="no-referrer"
              />
              <span>Profile</span>
            </Link>
          </li>
        ) : null}
        {session?.user ? (
          <li>
            <SignOutButton
              className={
                "hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
              }
            />
          </li>
        ) : (
          <li>
            <Link
              href="/login"
              className="hover:text-slate-50 transition transform ease-in-out hover:-translate-x-1 hover:bg-main-300 rounded-md flex items-center gap-1 text-nowrap px-4 font-bold"
            >
              Login
            </Link>
          </li>
        )}
        {/* {session?.user?.admin ? (
          <li>
            <AdminDropdown />
          </li>
        ) : null} */}
      </ul>
    </nav>
  );
}

// {session?.user?.image ? (
//   <li>
//     <Link
//       href="/profile"
//       className="hover:text-accent-400 transition-colors flex items-center gap-2 mr-2"
//     >
//       <img
//         src={session.user.image}
//         alt={session.user.name}
//         className="h-7 rounded-full"
//         //* sometimes needsd by google
//         referrerPolicy="no-referrer"
//       />
//       <span>Profile</span>
//     </Link>
//   </li>
// ) : null}

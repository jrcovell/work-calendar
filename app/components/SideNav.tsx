"use client"; // using usePathname from next/navigation (client-side hook)

import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import {
  CalendarDateRangeIcon,
  CalendarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { useFormStatus } from "react-dom";

type SideNavItems = {
  name: string;
  icon: JSX.Element;
  href: string;
};

const sideNavLinks: SideNavItems[] = [
  {
    name: "Shifts",
    icon: <CalendarDateRangeIcon className="h-5 w-5" />,
    href: "/profile",
  },
  {
    name: "Request Time Off",
    icon: <CalendarDaysIcon className="h-5 w-5" />,
    href: "/profile/time-off",
  },

  {
    name: "Edit Profile",
    icon: <UserCircleIcon className="h-5 w-5" />,
    href: "/profile/editProfile",
  },
];

function SideNav() {
  const pathname = usePathname();
  const { pending } = useFormStatus();

  return (
    <nav className="bg-violet-400 text-slate-800 p-4 border-r fixed top-15 left-1">
      <ul className="flex flex-col gap-2 text-lg ">
        {sideNavLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={` hover:bg-slate-300 hover:text-slate-950 rounded-md p-2 flex items-center hover:translate-x-3 transform ease-in-out transition font-semibold gap-2 ${
                pathname === link.href
                  ? "bg-violet-600 text-slate-300 translate-x-3"
                  : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <SignOutButton
            className={
              "hover:bg-slate-300 hover:text-slate-950 rounded-md py-2 px-4 flex items-center hover:translate-x-3 transform ease-in-out transition font-semibold gap-2 text-nowrap"
            }
          />
        </li>
      </ul>
    </nav>
  );
}

export default SideNav;

import { Staff } from "@/types";
import { getStaff } from "../_lib/data-access";
import StaffCard from "./StaffCard";
import { useCalendar } from "../context/CalendarContext";
import AddStaffButton from "../components/AddStaffButton";
import AddStaffModal from "../components/AddStaffModal";
import { auth } from "../_lib/auth";
import EditStaffButton from "../components/EditStaffButton";
import EditStaffModal from "../components/EditStaffModal";

export const metadata = {
  title: "Contact List",
};

export default async function Page() {
  const staff: Staff[] = await getStaff();
  const session = await auth();

  return (
    <div>
      <AddStaffModal />
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl mt-2 text-accent-400 mb-7">
          Staff List
        </h2>
        <div className="flex gap-3 items-center justify-end">
          {session?.user?.admin && <AddStaffButton />}
          {session?.user?.admin && <EditStaffButton />}
        </div>
        <EditStaffModal staff={staff} />
      </div>
      {staff.map((staff, i) => (
        <div key={staff.id}>
          <StaffCard staff={staff} />
        </div>
      ))}
    </div>
  );
}

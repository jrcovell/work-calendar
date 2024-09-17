import { getShiftsFromServer, getStaffFromServer } from "../_lib/actions";
import { auth } from "../_lib/auth";
import Filter from "../components/Filter";

import ShiftList from "../components/ShiftList";
import { Session } from "@/types";

export const metadata = {
  title: "Profile",
};
export const revalidate = 3600; // refreshes the page every hour (3600 seconds)

export default async function Page({ searchParams }: { searchParams: any }) {
  const session = await auth();
  if (!session) {
    return null;
  }

  const filter = searchParams?.date ?? "all";

  return (
    <>
      <div className="mb-3 flex justify-evenly">
        <h2 className=" font-semibold text-3xl">Shift List</h2>
        <Filter />
      </div>
      <div>
        <ShiftList filter={filter} />
      </div>
    </>
  );
}

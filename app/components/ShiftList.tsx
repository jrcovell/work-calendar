import { get } from "http";
import { getShiftsFromServer } from "../_lib/actions";
import { auth } from "../_lib/auth";
import ShiftCard from "./ShiftCard";

async function ShiftList({ filter }) {
  const session = await auth();
  const shifts = await getShiftsFromServer(session?.user.staffId);

  let filteredShifts = [];

  if (filter === "all") {
    filteredShifts = shifts;
  }
  if (filter === "previous") {
    filteredShifts = shifts.filter(
      (shift) => new Date(shift.start) < new Date()
    );
  }
  if (filter === "week") {
    filteredShifts = shifts.filter(
      (shift) =>
        new Date(shift.start) > new Date() &&
        new Date(shift.start) <
          new Date(new Date().setDate(new Date().getDate() + 7))
    );
  }
  if (filter === "month") {
    filteredShifts = shifts.filter(
      (shift) =>
        new Date(shift.start) > new Date() &&
        new Date(shift.start) <
          new Date(new Date().setMonth(new Date().getMonth() + 1))
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {filteredShifts
        .sort(
          (a, b) => new Date(a.start).getDate() - new Date(b.start).getDate()
        )
        .map((shift) => (
          <div key={shift.id} className="col-span-1">
            <ShiftCard shift={shift} />
          </div>
        ))}
    </div>
  );
}

export default ShiftList;

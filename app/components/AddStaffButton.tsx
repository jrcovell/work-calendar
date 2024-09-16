"use client";
import { useCalendar } from "../context/CalendarContext";

function AddStaffButton() {
  const { showAddStaff, setShowAddStaff } = useCalendar();

  function handleClick() {
    setShowAddStaff(true);
  }

  return (
    <button
      className="bg-main-600 text-secondary-100 px-3 py-2 rounded-md justify-end font-semibold hover:bg-main-700"
      onClick={handleClick}
    >
      Add Staff
    </button>
  );
}

export default AddStaffButton;

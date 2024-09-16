"use client";

import { useCalendar } from "../context/CalendarContext";

function EditStaffButton() {
  const { setShowEditStaff } = useCalendar();

  function handleClick() {
    setShowEditStaff(true);
  }

  return (
    <button
      className="bg-main-600 text-secondary-100 px-3 py-2 rounded-md justify-end font-semibold hover:bg-main-700"
      onClick={handleClick}
    >
      Edit Staff
    </button>
  );
}

export default EditStaffButton;

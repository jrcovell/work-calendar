"use client";

import { Shift } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const CalendarContext = createContext<any>(null);

function CalendarProvider({ children }: { children: ReactNode }) {
  const [showEdit, setShowEdit] = useState<boolean>(false); //* reveal/hide edit modal
  const [showAdd, setShowAdd] = useState<boolean>(false); //* reveal/hide add modal
  const [showAddStaff, setShowAddStaff] = useState<boolean>(false); //* reveal/hide add staff modal
  const [showEditStaff, setShowEditStaff] = useState<boolean>(false); //* reveal/hide edit staff modal
  const [showAddEvent, setShowAddEvent] = useState<boolean>(false); //* reveal/hide add event modal
  const [showEditEvent, setShowEditEvent] = useState<boolean>(false); //* reveal/hide edit event modal
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null); //* stores date of selected day
  const [shiftBatch, setShiftBatch] = useState<Shift[]>([]);

  return (
    <CalendarContext.Provider
      value={{
        showEdit,
        setShowEdit,
        showAdd,
        setShowAdd,
        selectedShift,
        setSelectedShift,
        selectedDate,
        setSelectedDate,
        shiftBatch,
        setShiftBatch,
        showAddStaff,
        setShowAddStaff,
        showEditStaff,
        setShowEditStaff,
        showEditEvent,
        setShowEditEvent,
        showAddEvent,
        setShowAddEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

function useCalendar() {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }

  return context;
}

export { CalendarProvider, useCalendar };

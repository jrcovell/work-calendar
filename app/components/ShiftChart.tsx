"use client";

import { Shift } from "@/types";
import { useState } from "react";

function ShiftChart({ staff }: { staff: any[] }) {
  const [shifts, setShifts] = useState<Shift[]>(
    staff.map((staff) => ({
      staff: staff.name,
      id: staff.id,
      color: staff.color,
    }))
  );

  return (
    <div className="col-span-2 grid grid-cols-4 ml-2 mt-2" id="draggable-el">
      <div className="col-span-4 mt-3">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="grid grid-cols-8 font-bold border border-purple-900 p-1 items-center"
          >
            <span className="col-span-4 border-r-2">{shift.staff}</span>

            <span
              id={shift.staff.toString()}
              title={"Open" + " " + shift.staff}
              className="fc-event col-span-1 border border-3  hover:bg-slate-100  border-zinc-600 bg-lime-500 h-5 w-5 rounded-md mx-1 "
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShiftChart;

/*
       {shifts.map((shift) => (
          <div
            // key={shift.id}
            className="grid grid-cols-8 font-bold border border-purple-900 p-1 items-center"
          >
            <span className="col-span-4 border-r-2">
              {shift.staff.toString()}
            </span>

            <span
              id={shift.staff.toString()}
              title={"Open" + " " + shift.staff}
              className="fc-event col-span-1 border border-3  hover:bg-slate-100  border-zinc-600 bg-lime-500 h-5 w-5 rounded-md mx-1 "
            ></span>

            <span
              id={shift.staff.toString()}
              title={"Up the Middle" + " " + shift.staff}
              className="fc-event px-1 col-span-1 border border-3 hover:bg-slate-100 border-zinc-600 bg-red-500 h-5 w-5 rounded-md mx-1"
            ></span>

            <span
              id={shift.staff.toString()}
              title={"Close" + " " + shift.staff}
              className="fc-event col-span-1 border border-3 hover:bg-slate-100 border-zinc-600 bg-blue-500 h-5 w-5 rounded-md mx-1"
            ></span>
            <span className="border rounded-lg border-purple-400 px-1">
            
              </span>
              </div>
            ))}
            */

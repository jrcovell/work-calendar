"use client";

import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { ReactDOM } from "react";

import DatePicker from "react-datepicker";
import { addRequestTimeOff } from "../_lib/actions";
import { revalidatePath } from "next/cache";

function TimeOffForm({ staff }: { staff: any }) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [requestedOffDays, setRequestedOffDays] = useState<string>("");
  const staffId = staff.id;
  const staffName = staff.name;

  const onChange = (dates: [any, any]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (!end) {
      setRequestedOffDays(start?.toString().slice(0, 10));
    } else {
      setRequestedOffDays(
        `${start?.toString().slice(0, 10)} - ${end?.toString().slice(0, 10)} `
      );
    }
  };

  function confirmTimeOff() {
    if (startDate && endDate) {
      // get all the days between the start and end date
      // add the end date to the array
      // days.push(endDate);
      // set the state
      // setRequestedOffDays(days);
      // send the request to the server
      addRequestTimeOff(startDate, endDate, requestedOffDays, staff);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold ml-2 ">Request Day(s) Off:</h1>
      <DatePicker
        className="bg-violet-200 border border-slate-500 rounded-md py-2 px-4 m-2"
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        //set min date to 1 week from now
        minDate={new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)}
        selectsRange
      />
      {requestedOffDays && (
        <button
          className="bg-violet-600 border border-slate-200 text-slate-200 rounded-md
       px-4 py-3 m-2 text-primary-800 font-semibold hover:bg-violet-800 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          onClick={confirmTimeOff}
        >
          Request Time Off
        </button>
      )}
    </div>
  );
}

export default TimeOffForm;

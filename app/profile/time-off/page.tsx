import { getStaffFromServer, getTimeOffFromServer } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import TimeOffForm from "@/app/components/TimeOffForm";
import TimeCard from "@/app/components/TimeCard";
import React from "react";

async function Page() {
  const session = await auth();
  const staff = await getStaffFromServer(session.user.email);
  const timeOff = await getTimeOffFromServer(staff.id);

  return (
    <div>
      <TimeOffForm staff={staff} />
      {timeOff.map((days, i) => (
        <div key={i}>
          <TimeCard timeOff={days} />
        </div>
      ))}
    </div>
  );
}

export default Page;

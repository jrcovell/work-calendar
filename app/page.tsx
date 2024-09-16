import { auth } from "@/app/_lib/auth";
import {
  getEvents,
  getSchedule,
  getStaff,
  getTimeOff,
} from "@/app/_lib/data-access";
import HomeCalendar from "./components/HomeCalendar";

export default async function Page() {
  const [schedule, events, staff, timeOff] = await Promise.all([
    getSchedule(),
    getEvents(),
    getStaff(),
    getTimeOff(),
  ]);

  const session = await auth();

  return (
    <div>
      <HomeCalendar
        schedule={schedule}
        events={events}
        staff={staff}
        timeOff={timeOff}
        user={session?.user}
      />
    </div>
  );
}

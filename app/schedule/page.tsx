import { auth } from "../_lib/auth";
import {
  getEvents,
  getSchedule,
  getStaff,
  getTimeOff,
} from "../_lib/data-access";
import LoginScreen from "../components/LoginScreen";
import CalendarView from "../components/CalendarView";

export default async function Page() {
  // const schedule = await getSchedule();
  // const events = await getEvents();
  // const staff = await getStaff();

  //* Promise.all is used to fetch all data at the same time
  const [schedule, events, staff, timeOff] = await Promise.all([
    getSchedule(),
    getEvents(),
    getStaff(),
    getTimeOff(),
  ]);
  //* can access session data in client, but trick so passing it in
  const session = await auth();
  console.log("events", events);
  // console.log("schedule", schedule);
  return (
    <div>
      {session?.user ? (
        <CalendarView
          schedule={schedule}
          events={events}
          staff={staff}
          timeOff={timeOff}
          user={session.user}
        />
      ) : (
        <LoginScreen />
      )}
    </div>
  );
}

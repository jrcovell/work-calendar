import Calendar from "../components/Calendar";
import {
  getEvents,
  getSchedule,
  getSettings,
  getStaff,
  getTimeOff,
} from "../_lib/data-access";
import { auth } from "../_lib/auth";

export default async function Page() {
  const [events, staff, schedule, settings] = await Promise.all([
    getEvents(),
    getStaff(),
    getSchedule(),
    getSettings(),
  ]);

  return (
    <div>
      <Calendar
        events={events}
        staff={staff}
        schedule={schedule}
        settings={settings}
      />
    </div>
  );
}

import { Event } from "@/types";

function EventCard({ event }: { event: Event }) {
  const { start, end, allDay, title, date, backgroundColor, type } = event;

  // const convertedStart = new Date(start).toLocaleTimeString();
  // const convertedEnd = new Date(end).toLocaleTimeString();
  // console.log(convertedStart);
  // console.log("startTime", startTime); // 13:00:00
  // console.log("endTime", endTime); // 14:00:00
  // // convert to 24 to 12 hour
  // console.log("convertedStart", startTime.
  // console.log("convertedEnd", new Date(endTime).toLocaleTimeString()); // 2:00 PM

  const eventTime = allDay
    ? "All Day Event"
    : `${new Date(start).toLocaleTimeString()} - ${new Date(
        end
      ).toLocaleTimeString()}`;

  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={`py-3 px-2 grid-cols-2 gap-2 border-4 rounded-sm hover:border-secondary-400 transition ease-linear`}
    >
      <h3
        className={`text-secondary-800 font-semibold text-xl col-span-1 justify-center flex mx-2 mb-2 p-1 rounded-lg`}
      >
        {title}
      </h3>
      <div className="col-span-1 flex justify-between">
        <h3 className="text-secondary-50 font-bold outline-solid rounded-lg bg-secondary-800 p-1">
          {date}
        </h3>

        <div className="text-secondary-50 font-bold outline-solid rounded-lg bg-secondary-800 p-1">
          {eventTime}
        </div>
      </div>
    </div>
  );
}

export default EventCard;

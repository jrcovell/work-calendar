"use client";

import { set } from "react-datepicker/dist/date_utils";
import { useCalendar } from "../context/CalendarContext";
import EventCard from "./EventCard";
import Modal from "./Modal";
import { useState } from "react";
import EditEventForm from "./EditEventForm";
import { Event, Session, User } from "@/types";

function EventList({
  events,
  filter,
  // session,
  adminUser,
}: {
  events: Event[];
  filter: string;
  // session: Session;
  adminUser: boolean;
}) {
  const { setShowEditEvent, showEditEvent } = useCalendar();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  console.log("adminUser", adminUser);

  function handleModal(event: Event) {
    setShowEditEvent(true);
    setSelectedEvent(event);
  }

  let filteredEvents: Event[] = [];

  if (filter === "all") {
    filteredEvents = events;
  }
  if (filter === "previous") {
    filteredEvents = events.filter(
      (event) => new Date(event.start) < new Date()
    );
  }
  if (filter === "week") {
    filteredEvents = events.filter(
      (event) =>
        new Date(event.start) > new Date() &&
        new Date(event.start) <
          new Date(new Date().setDate(new Date().getDate() + 7))
    );
  }
  if (filter === "month") {
    filteredEvents = events.filter(
      (event) =>
        new Date(event.start) > new Date() &&
        new Date(event.start) <
          new Date(new Date().setMonth(new Date().getMonth() + 1))
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {filteredEvents
          .sort(
            (a, b) => new Date(a.start).getDate() - new Date(b.start).getDate()
          )
          .map((event: any) => (
            <div
              key={event.id}
              className="col-span-1"
              onClick={() => {
                adminUser ? handleModal(event) : null;
              }}
            >
              <EventCard event={event} />
            </div>
          ))}
      </div>
      <Modal show={showEditEvent} onClose={setShowEditEvent} title="Edit Event">
        <EditEventForm event={selectedEvent} />
      </Modal>
    </>
  );
}

export default EventList;

"use server";

import { supabase } from "./supabase";
// revalidate path - revalidates the cache for the given path
import { revalidatePath } from "next/cache";
import { Shift, Staff } from "@/types";
import { getStaff } from "./data-access";
import { signIn, signOut } from "./auth";
import toast from "react-hot-toast";

//^ STAFF ACTIONS

export async function addStaffToServer(formData: any) {
  //convert admin checkbox to boolean
  const admin = formData.get("admin") === "on" ? true : false;
  const newStaff = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    admin: admin,
    color: formData.get("color"),
  };
  console.log("newStaff", newStaff);
  const { error } = await supabase.from("staff").insert([newStaff]);

  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/staff");
}

export async function editStaffToServer(formData: any) {
  //convert admin checkbox to boolean
  const admin = formData.get("admin") === "on" ? true : false;
  const email = formData.get("email");
  const phone = formData.get("phone");
  console.log(formData);
  const updatedStaff = {
    email: formData.get("email"),
    phone: formData.get("phone"),
    admin: admin,
  };

  console.log("updatedStaff", updatedStaff);

  const { error } = await supabase
    .from("staff")
    .update(updatedStaff)
    .eq("id", formData.get("name"));

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/staff");
}

//* assigns staff from table depending on email from auth login (google)
export async function getStaffFromServer(email: string) {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .eq("email", email)
    .single();

  //error handling in auth.ts
  return data;
}

//^ SHIFT ACTIONS

export async function addShiftToServer(formData: any) {
  const staff = await getStaff();

  const start = new Date(formData.get("date") + "T" + formData.get("start"));
  const end = new Date(formData.get("date") + "T" + formData.get("end"));
  const staffId = formData.get("staff");
  const selectedStaff = staff.find((s) => Number(s.id) === Number(staffId));

  const newShift = {
    type: formData.get("type"),
    //* go back 4 hours to get the correct time (UTC)
    start: new Date(start.getTime() - 4 * 60 * 60 * 1000),
    end: new Date(end.getTime() - 4 * 60 * 60 * 1000),
    title: selectedStaff?.name,
    staffId: formData.get("staff"),
    borderColor: selectedStaff?.color,
  };

  // console.log("newShift", newShift);

  const { error } = await supabase.from("schedule").insert([newShift]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/schedule");
  return true;
  // close modal after adding shift
}

export async function editShiftToServer(formData: any) {
  console.log("from actions.ts", formData);

  const date = new Date(formData.get("date"));
  //* convert date to string ("2024-08-13")
  const dateString = date.toISOString().substring(0, 10);

  const start = new Date(dateString + "T" + formData.get("start"));
  const end = new Date(dateString + "T" + formData.get("end"));
  console.log("start", start);
  const updatedShift = {
    //   type: formData.get("type"),
    //   //* go back 4 hours to get the correct time (UTC)
    start: new Date(start.getTime() - 4 * 60 * 60 * 1000),
    end: new Date(end.getTime() - 4 * 60 * 60 * 1000),
    //   title: formData.get("staff"),
    //   staffId: formData.get("staff"),
    //   borderColor: "blue",
  };

  console.log("updatedShift", updatedShift);

  const { error } = await supabase
    .from("schedule")
    .update(updatedShift)
    .eq("id", formData.get("id"));

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/schedule");
  return true;
  // // close modal after adding shift
}

export async function deleteShiftFromServer(formData: any) {
  const shiftId = formData.get("id");

  const { error } = await supabase
    .from("schedule")
    .delete()
    .eq("id", shiftId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/schedule");
}

export async function getShiftsFromServer(id: string) {
  const { data, error } = await supabase
    .from("schedule")
    .select("*")
    .eq("staffId", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addShiftsToServer(data: Shift[]) {
  console.log("from actions.ts", data);

  //* go back 4 hours to get the correct time (UTC) + (fullCalendar format is weird)
  data.forEach((shift: Shift) => {
    shift.start = new Date(shift.start.getTime() - 4 * 60 * 60 * 1000);
    shift.end = new Date(shift.end.getTime() - 4 * 60 * 60 * 1000);
  });
  //* remove findId before sending to server
  data.forEach((shift: Shift) => delete shift.findId);

  console.log("data", data);
  const { error } = await supabase.from("schedule").insert(data);

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateShiftFromServer(id: number) {
  console.log("from actions.ts", id);
  // const { error } = await supabase.from("schedule").delete().eq("id", id);

  // if (error) {
  //   throw new Error(error.message);
  // }
}

//^ AUTH ACTIONS

export async function login() {
  await signIn("google", { redirectTo: "/" }); // from auth.ts
}
export async function logout() {
  await signOut({ redirectTo: "/" }); // from auth.ts
}

//^ TIME OFF ACTIONS

export async function addRequestTimeOff(
  startDate: Date,
  endDate: Date,
  requestedOffDays: string,
  staff: Staff
) {
  // console.log("startDate", startDate);
  // console.log("endDate", endDate);
  // console.log("requestedOffDays", requestedOffDays);
  console.log("staffId", staff.id);
  console.log("staff", staff);
  // console.log("staffName", staffName);

  const { error } = await supabase.from("time-off").insert([
    {
      staffId: staff.id, // {staffId: 1}
      requestedOffDays: requestedOffDays,
      start: startDate,
      end: endDate,
      title: `Request Off: ${staff.name}`,
      backgroundColor: staff.color,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/time-off");
}

export async function getTimeOffFromServer(id: number) {
  const { data, error } = await supabase
    .from("time-off")
    .select("requestedOffDays, id")
    .eq("staffId", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteTimeOffFromServer(formData: any) {
  // console.log("id from actions.ts", formData.get("id"));
  //* from DeleteShiftButton.tsx
  const id = formData.get("id");

  const { error } = await supabase
    .from("time-off")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/time-off");
}

//^ EVENT ACTIONS

export async function addEventToServer(formData: any) {
  // console.log("formData event", formData);
  // add date to start and end time
  console.log("formData end", formData.get("end"));
  const start = new Date(formData.get("date") + "T" + formData.get("start"));
  const end = new Date(formData.get("date") + "T" + formData.get("end"));
  // infer event color based on event type
  const eventColor =
    formData.get("type") === "junior"
      ? "#ffcc00"
      : formData.get("type") === "ladies"
      ? "#ff0000"
      : formData.get("type") === "mens"
      ? "#000fff"
      : formData.get("type") === "seniors"
      ? "#ff6600"
      : formData.get("type") === "task"
      ? "#6600cc"
      : formData.get("type") === "outing"
      ? "#00cc00"
      : "black";

  const newEvent = {
    title: formData.get("title"),
    date: formData.get("date"),
    start: start,
    end: end,
    allDay: formData.get("allDay"),
    type: formData.get("type"),
    backgroundColor: eventColor,
    display: "block",
  };

  console.log("newEvent", newEvent);

  const { error } = await supabase.from("events").insert([newEvent]);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
}

export async function editEventToServer(formData: any) {
  console.log("formData event", formData);
  // add date to start and end time
  const start = new Date(formData.get("date") + "T" + formData.get("start"));
  const end = new Date(formData.get("date") + "T" + formData.get("end"));
  const allDay = formData.get("allDay") ? true : false;
  const updatedEvent = {
    title: formData.get("title"),
    date: formData.get("date"),
    start: start,
    end: end,
    allDay: allDay,
    backgroundColor: formData.get("backgroundColor"),
    display: "block",
  };

  console.log("updatedEvent", updatedEvent);

  const { error } = await supabase
    .from("events")
    .update(updatedEvent)
    .eq("id", formData.get("id"));

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
}

export async function deleteEventFromServer(formData: any) {
  const eventId = formData.get("id");
  // console.log("id", eventId);
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/events");
}

//^ Profile Actions

export async function updateProfile(formData: any) {
  const updatedProfile = {
    name: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  console.log("updatedProfile", updatedProfile);

  const { error } = await supabase
    .from("staff")
    .update(updatedProfile)
    .eq("id", formData.get("id"));

  if (error) {
    return new Error(error.message);
  }

  revalidatePath("/profile");
  return true;
}

//^ Settings Actions

export async function updateSettings(formData: any) {
  // console.log("formData", formData);
  const updatedSettings = {
    defaultStart: formData.get("defaultStart"),
    defaultEnd: formData.get("defaultEnd"),
    defaultMiddle: formData.get("defaultMiddle"),
  };

  console.log("updatedSettings", updatedSettings);
  const { error } = await supabase
    .from("settings")
    .update(updatedSettings)
    .eq("id", "1");

  if (error) {
    return new Error(error.message);
  }

  revalidatePath("/settings");
  // return true;
}

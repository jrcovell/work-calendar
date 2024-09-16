import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "./supabase";
//& Event Requests

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//& Schedule Requests
export async function getSchedule() {
  const { data, error } = await supabase.from("schedule").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//& Staff Requests

export async function getStaff() {
  const { data, error } = await supabase.from("staff").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//& Time Off Requests

export async function getTimeOff() {
  const { data, error } = await supabase.from("time-off").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

//& Settings Requests

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

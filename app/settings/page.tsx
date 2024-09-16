import { Suspense } from "react";
import { getEvents, getSettings, getTimeOff } from "../_lib/data-access";
import UpdateSettingsForm from "../components/UpdateSettingsForm";

export default async function Page() {
  const settings = await getSettings();

  return (
    <>
      <div>Settings...</div>

      <UpdateSettingsForm settings={settings} />
    </>
  );
}

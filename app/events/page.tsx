import { Suspense } from "react";
import { getEvents } from "../_lib/data-access";
import EventList from "../components/EventList";
import EventUI from "../components/EventUI";
import Filter from "../components/Filter";
import Spinner from "../components/Spinner";
import { auth } from "../_lib/auth";

export const metadata = {
  title: "Events",
};
// revalidate every hour
export const revalidate = 3600;

async function Page({ searchParams }: { searchParams: any }) {
  const events = await getEvents();
  const filter = searchParams?.date ?? "all";
  const session = await auth();

  return (
    <>
      <div className="m-4 flex justify-between">
        <EventUI events={events} />
        <Filter />
      </div>
      <div>
        {/* fallback will run again if the filter changes */}
        <Suspense fallback={<Spinner />} key={filter}>
          <EventList events={events} filter={filter} user={session?.user} />
        </Suspense>
      </div>
    </>
  );
}

export default Page;

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

//! client components === interactivity

function Filter() {
  //*client hook to get the searchParams (used searchParams to receive the same data on server (page.js))
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // for active filter styling
  const activeFilter = searchParams.get("date") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("date", filter); // set the searchParams to the filter
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // replace the current URL with the new searchParams (filter)
    // scroll: false prevents the page from scrolling to the top(optional)
  }

  return (
    <div className="border border-secondary-200">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All
      </Button>
      <Button
        filter="previous"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Previous
      </Button>
      <Button
        filter="week"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        This Week
      </Button>
      <Button
        filter="month"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        This Month
      </Button>
    </div>
  );
}

function Button({
  filter,
  handleFilter,
  activeFilter,
  children,
}: {
  filter: string;
  handleFilter: any;
  activeFilter: string;
  children: any;
}) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`border-2 border-secondary-100 px-3 py-1 hover:bg-main-200 ${
        filter === activeFilter ? "bg-main-500 text-main-50" : ""
      } `}
    >
      {children}
    </button>
  );
}

export default Filter;

import SideNav from "../components/SideNav";

import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid grid-cols-[15rem_1fr] gap-10 h-fit">
        <div className="mt-1">
          <SideNav />
        </div>
        <div className="py-2">{children}</div>
      </div>
    </>
  );
}

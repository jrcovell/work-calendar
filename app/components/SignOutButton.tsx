"use client";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { logout } from "../_lib/actions";
import { useFormStatus } from "react-dom";

//* server action signOutAction can still be called a client component.
function SignOutButton({ className }: { className: string }) {
  const { pending } = useFormStatus();

  return (
    <form action={logout}>
      <button className={className} disabled={pending}>
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>{pending ? "Logging Out..." : "Log Out"}</span>
      </button>
    </form>
  );
}

export default SignOutButton;

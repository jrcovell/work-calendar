"use client";

import { useFormStatus } from "react-dom";
import { ReactNode } from "react";
import { useCalendar } from "../context/CalendarContext";

export default function FormButton({
  children,
  pendingLabel,
  className,
  onClick,
  disabled,
}: {
  children: ReactNode;
  pendingLabel: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button className={className} disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}

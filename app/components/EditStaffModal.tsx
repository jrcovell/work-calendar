"use client";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useCalendar } from "../context/CalendarContext";

import AddStaffForm from "./AddStaffForm";
import { Staff } from "@/types";
import EditStaffForm from "./EditStaffForm";

export default function EditStaffModal({ staff, index }: { staff: Staff }) {
  const { showEditStaff, setShowEditStaff } = useCalendar();
  return (
    <>
      <Transition show={showEditStaff}>
        <Dialog as="div" className="relative z-10" onClose={setShowEditStaff}>
          {/* background opacity */}
          <TransitionChild
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-200"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </TransitionChild>
          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-slate-200 text-left shadow-xl transition-all">
                  <div className=" px-4">
                    <div className="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Edit Employee:
                      </DialogTitle>
                    </div>
                    <EditStaffForm staff={staff} index={index} />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

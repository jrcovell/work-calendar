import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useCalendar } from "../context/CalendarContext";
import AddShiftForm from "./AddShiftForm";
import { Staff } from "@/types";

export default function AddModal({ staff }: { staff: Staff[] }) {
  const { showAdd, setShowAdd } = useCalendar();
  const { selectedDate } = useCalendar();

  // console.log("STAFF", staff);

  // console.log("SELECTED SHIFT", selectedShift?.event?._instance?.range?.start);≠
  // console.log( "SELECTED SHIFT END", selectedShift?.event?._instance?.range?.end);
  // console.log("SELECTED SHIFT ID", selectedShift?.event?._def?.publicId);
  // console.log("SELECTED SHIFT TITLE", selectedShift?.event?._def?.title);

  // console.log("SELECTED SHIFT", selectedShift?.event);
  return (
    <>
      <Transition show={showAdd}>
        <Dialog as="div" className="relative z-10" onClose={setShowAdd}>
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
                        Add Shift for {selectedDate}.
                      </DialogTitle>
                    </div>
                    <AddShiftForm staff={staff} />
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

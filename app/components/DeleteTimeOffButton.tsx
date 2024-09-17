import { useFormStatus } from "react-dom";
import { deleteTimeOffFromServer } from "../_lib/actions";

function DeleteTimeOffButton({ id }: { id: number }) {
  return (
    <form action={deleteTimeOffFromServer}>
      <input type="hidden" name="id" value={id} />
      <button className="items-center rounded-md gap-6 text-lg text-secondary-200 bg-red-800 border transition-colors ease-in-out delay-50  hover:bg-red-500 hover:text-secondary-50 border-main-300 lg:px-4 py-4 md:px-1 md:py-2 md:text-sm lg:text-base  font-medium whitespace-nowrap ml-2">
        <span>Delete Request</span>
      </button>
    </form>
  );
}

export default DeleteTimeOffButton;

import { Staff } from "@/types";
import {
  AtSymbolIcon,
  CheckCircleIcon,
  PhoneArrowDownLeftIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { formatPhoneNumber } from "../utlis/inputChecker";
import EditStaffModal from "../components/EditStaffModal";
import EditStaffButton from "../components/EditStaffButton";
import { CircleStackIcon, UserCircleIcon } from "@heroicons/react/20/solid";

async function StaffCard({ staff }: { staff: Staff }) {
  const { name, phone, email } = staff;

  if (phone) {
    const formattedPhone = formatPhoneNumber(phone);
  }

  return (
    <div className="grid grid-cols-3 grid-flow-col p-5 bg-main-200 border my-1 hover:bg-main-300  transition transform ease-in-out hover:-translate-x-2">
      <div>
        <h3 className="flex gap-2  text-secondary-800 font-semibold text-2xl mb-1">
          {name}
          <UserCircleIcon
            style={{ color: staff.color }}
            className="h-6 w-6 mt-1 bg-secondary-800 rounded-full"
          />
        </h3>
      </div>

      <div className="flex gap-3 items-center">
        <PhoneArrowDownLeftIcon className="h-5 w-5 text-primary-600" />
        <p className="text-lg text-secondary-800">
          {phone ? formatPhoneNumber(phone) : "No Number"}
        </p>
      </div>
      <div className="flex gap-3 items-center">
        <AtSymbolIcon className="h-5 w-5 text-primary-600" />
        <p className="text-lg text-secondary-800">{email}</p>
      </div>
    </div>
  );
}

export default StaffCard;

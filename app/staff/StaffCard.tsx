import { Staff } from "@/types";
import {
  AtSymbolIcon,
  PhoneArrowDownLeftIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { formatPhoneNumber } from "../utlis/inputChecker";
import EditStaffModal from "../components/EditStaffModal";
import EditStaffButton from "../components/EditStaffButton";

async function StaffCard({ staff }: { staff: Staff }) {
  const { name, phone, email } = staff;

  if (phone) {
    const formattedPhone = formatPhoneNumber(phone);
  }

  return (
    <div className="grid grid-cols-3 grid-flow-col p-5 bg-main-200 border my-1">
      <div>
        <h3 className="text-secondary-800 font-semibold text-2xl mb-1">
          {name}
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

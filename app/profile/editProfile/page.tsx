import { getStaffFromServer } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import UpdateProfileForm from "@/app/components/UpdateProfileForm";

async function Page() {
  const session = await auth();
  const staff = await getStaffFromServer(session.user.email);

  return (
    <div>
      <UpdateProfileForm staff={staff} />
    </div>
  );
}

export default Page;

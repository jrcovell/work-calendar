import { getStaffFromServer } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import UpdateProfileForm from "@/app/components/UpdateProfileForm";

async function Page() {
  const session = await auth();
  if (!session) {
    return null;
  }

  let staffEmail: string = session?.user?.email ?? "";
  const staff = await getStaffFromServer(staffEmail);

  return (
    <div>
      <UpdateProfileForm staff={staff} />
    </div>
  );
}

export default Page;

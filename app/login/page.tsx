import SignInButton from "../components/SignInButton";

function Page() {
  return (
    <div className="flex items-center justify-center h-screen gap-5">
      <h2 className="text-2xl font-bold">Login for access</h2>
      <SignInButton />
    </div>
  );
}

export default Page;

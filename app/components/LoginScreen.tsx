import Link from "next/link";

function LoginScreen() {
  return (
    <>
      <div className="flex items-center justify-center h-screen space-x-3">
        <p className="text-4xl">Please</p>
        <Link className="text-4xl underline font-bold" href="/api/auth/signin">
          <span>Login</span>
        </Link>
        <p className="text-4xl"> to view this page</p>
      </div>
    </>
  );
}

export default LoginScreen;

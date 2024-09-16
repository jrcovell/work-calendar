//cannot be a client component because login flow should be server-side (no onClick(interaction) on server components)

//cannot call signIn function directly from the button(onClick) because no interaction on server components. use server action instead (form action)
import { login } from "../_lib/actions";

function SignInButton() {
  return (
    <form action={login}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;

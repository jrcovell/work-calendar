import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getStaffFromServer } from "./actions";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    //* called whenever matcher page is visited(from middleware.ts)
    authorized({ auth, request }: { auth: any; request: any }) {
      //^ !! converts to any value to a boolean
      return !!auth?.user;
    },
    async signIn({ user }: { user: any }) {
      try {
        const existingStaff = await getStaffFromServer(user.email);
        //if user is not in staff table, throw error (dont allow login, we only want admins to create staff)
        if (!existingStaff) {
          throw Error(
            "You are not in our staff list. Please contact manager for help."
          );
        }
        //if user is in staff table, return true
        return true;
      } catch {
        return false;
      }
    },
    // runs after signIn callback
    async session({ session }: { session: any }) {
      //assigns staff id to session user staff id from staff table in supabase
      const staff = await getStaffFromServer(session.user.email);
      session.user.staffId = staff.id;
      session.user.admin = staff.admin; //* add admin status to session for higher level access options (add staff, change schedule, etc.)
      return session; //? { user: { name: "Jake Covel", email: "..., image: "..., + staffId: 1 } }
    },
  },
  pages: {
    //* changes the default sign in page
    signIn: "/login",
    signOut: "/",
    //when user is not authorized to view a page email != staff.email
    error: "/error",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);

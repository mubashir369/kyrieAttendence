import NextAuth, { AuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Define a union type for roles
export type Role = "admin" | "hr" | "employee";

// Extend the NextAuth User type to include 'role' for the authorize function's return
interface AuthorizedUser extends NextAuthUser {
  role: Role;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Change 'credentials: any' to a specific type or remove the explicit ': any'
      async authorize(credentials) { // Line 15: Removed ': any' or use `Record<'email' | 'password', string> | undefined`
        
        // This is safe to leave without an explicit type if you trust the `credentials` structure
        // from the `credentials` definition above.

        await connectDB();
        
        // Assuming your Mongoose User model returns an object with `_id`, `name`, `email`, and `password`
        // We'll trust the User model type for now.
        const user = await User.findOne({ email: credentials?.email }); 
        
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // The returned object must match the structure defined in `AuthorizedUser`
        return { 
          id: user._id.toString(), 
          name: user.name, 
          email: user.email, 
          role: user.role as Role // Ensure `user.role` is cast to the `Role` union type
        } as AuthorizedUser; // Cast to the extended User type
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt" as const, 
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Line 42: Use the `AuthorizedUser` interface or explicitly type the assertion
        token.role = (user as AuthorizedUser).role; // Removed `(user as any)`
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.role) {
        // This assertion is fine as `token.role` was set by `jwt` callback
        session.user.role = token.role as Role; 
        session.id = token.id as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
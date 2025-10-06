import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
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
  
      token.role = (user as any).role as "admin" | "hr" | "employee";

      token.id=user.id
    }
    return token;
  },

  async session({ session, token }) {
    if (token?.role) {
   
      session.user.role = token.role as "admin" | "hr" | "employee";
     
      session.id = token.id as string;
    }
    return session;
  },
},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

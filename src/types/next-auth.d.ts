import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: "admin" | "hr" | "employee";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: "admin" | "hr" | "employee";
  }
}

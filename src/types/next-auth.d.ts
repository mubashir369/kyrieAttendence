import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
      id?: string;
    user: {
      role?: "admin" | "hr" | "employee";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
      id?: string;
    role?: "admin" | "hr" | "employee";
  }
}

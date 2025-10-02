import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    
    redirect("/login");
  }

  // redirect based on role
  if (session.user.role === "admin") {
    redirect("/dashboard");
  } else if (session.user.role === "hr") {
    redirect("/hr/dashboard");
  } else {
    redirect("/employee/dashboard");
  }

  return null; // fallback (won't be shown)
}

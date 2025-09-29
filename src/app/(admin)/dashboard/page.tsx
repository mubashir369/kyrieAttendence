import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return <h1 className="text-red-500">Access Denied</h1>;
  }

  return <h1 className="text-2xl">Admin Dashboard</h1>;
}

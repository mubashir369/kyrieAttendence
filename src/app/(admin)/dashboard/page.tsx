import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import EmployeeTable from "@/components/admin/EmployeeTable";
import EmployeeChart from "@/components/admin/EmployeeChart";

// Dummy data (replace with DB queries later)
const sickEmployees = [
  { name: "Bob Brown", email: "bob@example.com", department: "Finance" },
];
const leaveEmployees = [
  { name: "Alice Green", email: "alice@example.com", department: "Marketing" },
];

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return <h1 className="text-red-500 text-center mt-20">Access Denied</h1>;
  }

  const stats = {
    totalEmployees: 120,
    totalHR: 5,
    leavesToday: leaveEmployees.length,
    sickEmployees: sickEmployees.length,
    presentEmployees: 120 - leaveEmployees.length - sickEmployees.length,
  };

  const cards = [
    { title: "Total Employees", value: stats.totalEmployees, color: "bg-blue-500" },
    { title: "Total HR", value: stats.totalHR, color: "bg-green-500" },
    { title: "Leaves Today", value: stats.leavesToday, color: "bg-yellow-500" },
    { title: "Sick Employees", value: stats.sickEmployees, color: "bg-red-500" },
    { title: "Present Employees", value: stats.presentEmployees, color: "bg-purple-500" },
  ];

  const chartData = [
    { name: "Present", value: stats.presentEmployees },
    { name: "On Leave", value: stats.leavesToday },
    { name: "Sick", value: stats.sickEmployees },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`${card.color} text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center transition-transform transform hover:scale-105`}
          >
            <p className="text-lg font-semibold">{card.title}</p>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Tables */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <EmployeeChart data={chartData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <EmployeeTable
            title="Sick Employees"
            employees={sickEmployees}
            color="bg-red-500"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <EmployeeTable
            title="On Leave Today"
            employees={leaveEmployees}
            color="bg-yellow-500"
          />
        </div>
      </div>
    </div>
  );
}

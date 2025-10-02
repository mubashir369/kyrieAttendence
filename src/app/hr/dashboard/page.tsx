import { getDashboardData } from "@/lib/dashboard";
import EmployeeTable from "@/components/admin/EmployeeTable";
import EmployeeChart from "@/components/admin/EmployeeChart";

export default async function AdminDashboard() {

  const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const todayStr = `${yyyy}-${mm}-${dd}`;
  
  const { stats, unMarkedEmployees, leaveEmployees } = await getDashboardData(todayStr);

  const cards = [
    { title: "Total Employees", value: stats.totalEmployees, color: "bg-blue-500" },
    { title: "Total HR", value: stats.totalHR, color: "bg-green-500" },
    { title: "Leaves Today", value: stats.leavesToday, color: "bg-yellow-500" },
    { title: "Unmarked Employees", value: stats.unMarked, color: "bg-red-500" },
    { title: "Present Employees", value: stats.presentEmployees, color: "bg-purple-500" },
  ];

  const chartData = [
    { name: "Present", value: stats.presentEmployees },
    { name: "On Leave", value: stats.leavesToday },
    { name: "Unmarked", value: stats.unMarked },
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

  {/* Unmarked Employees Table with scroll */}
  <div className="bg-white rounded-lg shadow-md p-4 max-h-[480px] overflow-y-auto">
    <EmployeeTable
      title="Unmarked Employees"
      employees={unMarkedEmployees}
      color="bg-red-500"
    />
  </div>

  {/* On Leave Today Table with scroll */}
  <div className="bg-white rounded-lg shadow-md p-4 max-h-[480px] overflow-y-auto">
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

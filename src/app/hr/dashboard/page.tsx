"use client";

import { useEffect, useState } from "react";
import EmployeeTable from "@/components/admin/EmployeeTable";
import EmployeeChart from "@/components/admin/EmployeeChart";

// Define types for your data
interface Stats {
  totalEmployees: number;
  totalHR: number;
  leavesToday: number;
  presentEmployees: number;
  unMarked: number;
}

interface Employee {
  name: string;
  email: string;
  department: string;
}

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [unMarkedEmployees, setUnMarkedEmployees] = useState<Employee[]>([]);
  const [leaveEmployees, setLeaveEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const todayStr = `${yyyy}-${mm}-${dd}`;

        const res = await fetch(`/api/hr/dashboard?date=${todayStr}`, { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data: {
          stats: Stats;
          unMarkedEmployees: Employee[];
          leaveEmployees: Employee[];
        } = await res.json();

        setStats(data.stats);
        setUnMarkedEmployees(data.unMarkedEmployees);
        setLeaveEmployees(data.leaveEmployees);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Something went wrong while loading dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        <p className="text-lg animate-pulse">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p className="text-lg font-semibold">Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  const cards = [
    { title: "Total Employees", value: stats?.totalEmployees ?? 0, color: "bg-blue-500" },
    { title: "Total HR", value: stats?.totalHR ?? 0, color: "bg-green-500" },
    { title: "Leaves Today", value: stats?.leavesToday ?? 0, color: "bg-yellow-500" },
    { title: "Unmarked Employees", value: stats?.unMarked ?? 0, color: "bg-red-500" },
    { title: "Present Employees", value: stats?.presentEmployees ?? 0, color: "bg-purple-500" },
  ];

  const chartData = [
    { name: "Present", value: stats?.presentEmployees ?? 0 },
    { name: "On Leave", value: stats?.leavesToday ?? 0 },
    { name: "Unmarked", value: stats?.unMarked ?? 0 },
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

        <div className="bg-white rounded-lg shadow-md p-4 max-h-[480px] overflow-y-auto">
          <EmployeeTable
            title="Unmarked Employees"
            employees={unMarkedEmployees}
            color="bg-red-500"
          />
        </div>

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

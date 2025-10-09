"use client";

import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: string; 
}

export default function TodayReportPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch("/api/admin/employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);

  if (loading) return <p className="text-gray-700 mt-10 text-center">Loading...</p>;

  const totalEmployees = employees.length;
  const presentEmployees = employees.filter(emp => emp.status === "present").length;

  return (
    <div className="p-6">
     <h1 className="text-3xl font-bold mb-6">Today&apos;s Report</h1>

      {/* Summary */}
      <div className="flex space-x-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow flex-1 text-center">
          <h2 className="text-xl font-semibold">Total Employees</h2>
          <p className="text-2xl font-bold">{totalEmployees}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg shadow flex-1 text-center">
          <h2 className="text-xl font-semibold">Present Employees</h2>
          <p className="text-2xl font-bold">{presentEmployees}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 text-gray-800">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            {employees.map(emp => (
              <tr key={emp._id} className="hover:bg-gray-100">
                <td className="px-6 py-4">{emp.name}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.department}</td>
                <td className="px-6 py-4">{emp.role}</td>
                <td
                  className={`px-6 py-4 font-semibold ${
                    emp.status === "present" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

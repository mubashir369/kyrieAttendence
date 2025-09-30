"use client";

import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
  salaryType: string;
  leaveSalary: number;
  workingHoursPerDay: number;
  workingDaysPerMonth: number;
  department: string;
  status: string;
}

export default function EmployeeTableClient() {
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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/employees/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? { ...emp, status: newStatus } : emp))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full divide-y divide-gray-300 text-gray-800">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Salary</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Salary Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Leave Salary</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Working Hours/Day</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Working Days/Month</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50 divide-y divide-gray-200">
          {employees.map((emp) => (
            <tr key={emp._id} className="hover:bg-gray-100">
              <td className="px-6 py-4">{emp.name}</td>
              <td className="px-6 py-4">{emp.email}</td>
              <td className="px-6 py-4">{emp.department}</td>
              <td className="px-6 py-4">{emp.role}</td>
              <td className="px-6 py-4">
                <select
                  className={`px-2 py-1 rounded font-semibold text-white ${
                    emp.status === "active" ? "bg-green-500" : "bg-red-500"
                  }`}
                  value={emp.status}
                  onChange={(e) => handleStatusChange(emp._id, e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
              <td className="px-6 py-4">{emp.salary}</td>
              <td className="px-6 py-4">{emp.salaryType}</td>
              <td className="px-6 py-4">{emp.leaveSalary}</td>
              <td className="px-6 py-4">{emp.workingHoursPerDay}</td>
              <td className="px-6 py-4">{emp.workingDaysPerMonth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

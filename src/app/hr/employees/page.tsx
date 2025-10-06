"use client";

import { useEffect, useState } from "react";
import EditEmployeeModal from "@/components/admin/modals/EditEmployeeModal";
import DeleteEmployeeModal from "@/components/admin/modals/DeleteEmployeeModal";
import ResetPasswordModal from "@/components/admin/modals/ResetPasswordModal";

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
  employeeId:string
}

export default function EmployeeTableClient() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);
  const [resetEmployee, setResetEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch("/api/hr/employees");
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
 const updateEmployee = async (updated: Employee) => {
  try {
    const res = await fetch(`/api/admin/employees/${updated._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (!res.ok) {
      throw new Error("Failed to update employee");
    }

    const data = await res.json();


    setEmployees((prev) =>
      prev.map((e) => (e._id === data.employee._id ? data.employee : e))
    );
  } catch (err) {
    console.error(err);
    alert("Error updating employee");
  }
};

  if (loading) return <p className="text-gray-700">Loading...</p>;

  return (
    <div className="relative">
      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 text-gray-800">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Emp.ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
              {/* <th className="px-6 py-3 text-left text-sm font-semibold">Role</th> */}
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200 text-gray-800">
            {employees.map((emp) => (
              <tr key={emp._id} className="hover:bg-gray-100">
                 <td className="px-6 py-4">EMP- {emp.employeeId}</td>
                <td className="px-6 py-4">{emp.name}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.department}</td>
                {/* <td className="px-6 py-4">{emp.role}</td> */}
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
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => setEditEmployee(emp)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setResetEmployee(emp)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    Reset Password
                  </button>
                  {/* <button
                    onClick={() => setDeleteEmployee(emp)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      {editEmployee && (
        <EditEmployeeModal
          isOpen={!!editEmployee}
          employee={editEmployee}
          onClose={() => setEditEmployee(null)}
          onUpdate={updateEmployee}
        />
      )}

      {deleteEmployee && (
        <DeleteEmployeeModal
          employee={deleteEmployee}
          onClose={() => setDeleteEmployee(null)}
          onDelete={(id) =>
            setEmployees((prev) => prev.filter((e) => e._id !== id))
          }
        />
      )}

      {resetEmployee && (
        <ResetPasswordModal
          employee={resetEmployee}
          onClose={() => setResetEmployee(null)}
        />
      )}
    </div>
  );
}

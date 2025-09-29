"use client";

interface Employee {
  name: string;
  email: string;
  department?: string;
}

interface EmployeeTableProps {
  title: string;
  employees: Employee[];
  color: string; // Tailwind bg color for table header
}

export default function EmployeeTable({ title, employees, color }: EmployeeTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-x-auto mb-6">
      <div className={`p-4 font-bold text-white ${color} rounded-t-lg`}>
        {title} ({employees.length})
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((emp, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{emp.department || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

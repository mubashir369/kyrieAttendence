interface Employee {
  name: string;
  email: string;
  department: string;
}

interface Props {
  title: string;
  employees: Employee[];
  color: string;
}

export default function EmployeeTable({ title, employees, color }: Props) {
  return (
    <div>
      <h2
        className={`${color} text-white px-4 py-2 rounded-t-lg font-semibold text-lg`}
      >
        {title}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-left rounded-b-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-4 py-2 text-sm font-semibold text-gray-900">
                Department
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2 text-gray-800 uppercase">{emp.name}</td>
                  <td className="px-4 py-2 text-gray-800">{emp.email}</td>
                  <td className="px-4 py-2 text-gray-800">{emp.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-4 text-center text-gray-500 italic"
                >
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

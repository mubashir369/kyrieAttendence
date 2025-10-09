"use client";
import { useEffect, useState } from "react";

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  department:string
}

interface AttendanceRecord {
  _id: string;
  employeeId: Employee;
  date: string;
  inTime?: string;
  outTime?: string;
  status: "present" | "absent" | "weeklyOff";
  place: string[];
}

export default function AttendanceReport() {
  const [reportType, setReportType] = useState<"today" | "monthly" | "period">("today");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      let url = `/api/admin/attendance/reports?type=${reportType}`;
      const todayISO = new Date().toISOString().split('T')[0];

      if (reportType === "monthly") url += `&month=${month}&year=${year}`;
      if (reportType === "period") url += `&from=${from}&to=${to}`;
      if (reportType === "today") url += `&day=${todayISO}` 

      const res = await fetch(url);
      const data = await res.json();

      setRecords(data.records);
      setTotalEmployees(data.totalEmployees);
      setPresentEmployees(data.presentEmployees);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [reportType, month, year, from, to]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Attendance Report</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4 items-center flex-wrap">
      <select
  value={reportType}
  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
    setReportType(e.target.value as "today" | "monthly" | "period")
  }
  className="border p-2 rounded text-gray-800"
>
  <option value="today">Today</option>
  <option value="monthly">Monthly</option>
  <option value="period">Period</option>
</select>

        {reportType === "monthly" && (
          <>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              min={1}
              max={12}
              className="border p-2 rounded w-20 text-gray-800"
            />
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border p-2 rounded w-24 text-gray-800"
            />
          </>
        )}

        {reportType === "period" && (
          <>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="border p-2 rounded text-gray-800"
            />
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="border p-2 rounded text-gray-800"
            />
          </>
        )}
      </div>

 
      <div className="flex gap-4 mb-4 flex-wrap">
        <div className="p-4 bg-green-100 rounded shadow text-gray-900 font-semibold">
          Present Employees: {presentEmployees}
        </div>
      </div>

     
      {loading ? (
        <p className="text-gray-900">Loading...</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 text-gray-900">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">In</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Out</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Place</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {records.map((r) => {
                const formattedDate = new Date(r.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });
                const statusClass =
                  r.status === "present"
                    ? "text-green-600 font-bold"
                    : r.status === "absent"
                    ? "text-red-600 font-bold"
                    : "text-orange-600 font-bold";

                const statusText =
                  r.status === "present"
                    ? "PRESENT"
                    : r.status === "absent"
                    ? "ABSENT"
                    : "WEEKLY OFF";

                return (
                  <tr key={r._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 font-medium">{formattedDate}</td>
                    <td className="px-6 py-4">{r.employeeId.name}</td>
                    <td className={`px-6 py-4 ${statusClass}`}>{statusText}</td>
                    <td className="px-6 py-4">{r.employeeId.email}</td>
                    <td className="px-6 py-4">{r.employeeId.department}</td>
                    <td className="px-6 py-4">{r.inTime || "-"}</td>
                    <td className="px-6 py-4">{r.outTime || "-"}</td>
                    <td className="px-6 py-4">{Array.isArray(r.place) ? r.place.join(", ") : r.place}</td>
                    <td className="px-6 py-4">
                      {/* Optional action buttons */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

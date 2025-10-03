"use client";

import { useState } from "react";
import dayjs from "dayjs";

type AttendanceStatus = "present" | "absent" | "notMarked" | "weeklyOff";

interface AttendanceData {
  [date: string]: AttendanceStatus;
}


const dummyAttendance: AttendanceData = {
  "2025-10-01": "present",
  "2025-10-02": "absent",
  "2025-10-05": "weeklyOff",
  "2025-10-07": "notMarked",
  "2025-10-10": "present",
  "2025-10-12": "absent",
};

export default function EmployeeMonthlyReportPage() {
  const [employee, setEmployee] = useState("");
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [attendance, setAttendance] = useState<AttendanceData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttendance(dummyAttendance); 
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Employee Monthly Attendance Report
      </h1>

     
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 mb-8 items-center justify-center"
      >
       
        <select
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
          className="border p-3 rounded w-full md:w-1/3 text-gray-900"
          required
        >
          <option value="">Select Employee</option>
          <option value="EMP001">EMP001 - John Doe</option>
          <option value="EMP002">EMP002 - Jane Smith</option>
        </select>

    
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-3 rounded w-full md:w-1/3 text-gray-900"
          required
        />

       
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
        >
          Generate Report
        </button>
      </form>

   
      {attendance && (
        <AttendanceCalendar month={month} attendance={attendance} />
      )}
    </div>
  );
}


function AttendanceCalendar({
  month,
  attendance,
}: {
  month: string;
  attendance: AttendanceData;
}) {
  const startOfMonth = dayjs(month).startOf("month");
  const endOfMonth = dayjs(month).endOf("month");
  const daysInMonth = endOfMonth.date();

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "bg-green-500 text-white";
      case "absent":
        return "bg-red-500 text-white";
      case "weeklyOff":
        return "bg-orange-500 text-white";
      case "notMarked":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-200 text-gray-900";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        {dayjs(month).format("MMMM YYYY")}
      </h2>

    
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold text-gray-800">
            {d}
          </div>
        ))}

        {Array.from({ length: startOfMonth.day() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

      
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = startOfMonth.date(i + 1);
          const dateStr = date.format("YYYY-MM-DD");
          const status = attendance[dateStr] as AttendanceStatus | undefined;

          return (
            <div
              key={i}
              className={`p-3 rounded-lg font-semibold ${
                status ? getStatusColor(status) : "bg-gray-100 text-gray-800"
              }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

   
      <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-900">
        <Legend color="bg-green-500" label="Present" />
        <Legend color="bg-red-500" label="Absent" />
        <Legend color="bg-orange-500" label="Weekly Off" />
        <Legend color="bg-yellow-400" label="Not Marked" />
        <Legend color="bg-gray-200" label="No Data" />
      </div>
    </div>
  );
}


function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded ${color}`} />
      <span className="text-gray-900 font-medium">{label}</span>
    </div>
  );
}

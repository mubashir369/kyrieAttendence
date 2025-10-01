"use client";
import { useState, useEffect } from "react";

interface Employee {
  _id: string;
  name: string;
}

interface Props {
  onClose: () => void;
}

export default function MarkAttendanceModal({ onClose }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState("");
 const [date, setDate] = useState(() => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); 
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // format YYYY-MM-DD
});
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [place, setPlace] = useState("");
  const [customPlace, setCustomPlace] = useState("");
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [loading, setLoading] = useState(false);

  const PLACE_OPTIONS = ["VSM", "OTP", "EDP", "VSG", "VSK", "OTHER"];

  useEffect(() => {
    // Fetch employees from API
    async function fetchEmployees() {
      try {
        const res = await fetch("/api/admin/employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    if (!employeeId || !date) return alert("Please fill all required fields");

    let finalPlace = place === "OTHER" ? customPlace : place;

    setLoading(true);
    try {
      await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          date,
          status,
          place: finalPlace,
          inTime,
          outTime,
        }),
      });
      alert("Attendance marked successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to mark attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-gray-50 text-gray-900 rounded-lg p-6 w-96 shadow-2xl relative">
        <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

        {/* Date */}
        <input
          type="date"
          className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Employee */}
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "present" | "absent")}
          className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        {/* Place (only if Present) */}
        {status === "present" && (
          <>
            <select
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
            >
              <option value="">Select Place</option>
              {PLACE_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Custom Place */}
            {place === "OTHER" && (
              <input
                type="text"
                placeholder="Enter custom place"
                value={customPlace}
                onChange={(e) => setCustomPlace(e.target.value)}
                className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
              />
            )}

            {/* In / Out Times */}
            <input
              type="time"
              value={inTime}
              onChange={(e) => setInTime(e.target.value)}
              className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
            />
            <input
              type="time"
              value={outTime}
              onChange={(e) => setOutTime(e.target.value)}
              className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
            />
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

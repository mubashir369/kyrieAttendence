"use client";
import { useState, useEffect } from "react";
import branches from "@/data/branches.json";

interface Employee {
  _id: string;
  name: string;
  defaultBranch?: string; 
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
    return `${yyyy}-${mm}-${dd}`;
  });
  const [status, setStatus] = useState<"present" | "absent">("present");
  const [place, setPlace] = useState<string[]>([]);
  const [customPlace, setCustomPlace] = useState("");
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [loading, setLoading] = useState(false);

  const PLACE_OPTIONS = [...branches, "OTHER"];

  useEffect(() => {
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

  const handleEmployeeChange = (id: string) => {
    setEmployeeId(id);
    const selectedEmployee = employees.find((emp) => emp._id === id);
    if (selectedEmployee?.defaultBranch) {
      setPlace([selectedEmployee.defaultBranch]); 
    } else {
      setPlace([]);
    }
    setCustomPlace(""); 
  };

  const handleStatusChange = (value: "present" | "absent") => {
    setStatus(value);
    if (value === "absent") {
      setPlace([]);
      setCustomPlace("");
    }
  };

  const togglePlace = (p: string) => {
    if (place.includes(p)) {
      setPlace(place.filter((pl) => pl !== p));
    } else {
      setPlace([...place, p]);
    }
  };

  const handleSubmit = async () => {
    if (!employeeId || !date) return alert("Please fill all required fields");

    let finalPlaces = [...place];
    if (place.includes("OTHER") && customPlace) {
      finalPlaces = finalPlaces.filter((p) => p !== "OTHER");
      finalPlaces.push(customPlace);
    }

    setLoading(true);
    try {
      await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId,
          date,
          status,
          place: finalPlaces,
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

    
        <input
          type="date"
          className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />


        <select
          value={employeeId}
          onChange={(e) => handleEmployeeChange(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

   
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as "present" | "absent")}
          className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="weeklyOff">Weekly Off</option>
        </select>

    
        {status === "present" && (
          <>
            <div className="mb-3">
              <label className="font-semibold">Select Place(s):</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {PLACE_OPTIONS.map((p) => (
                  <label key={p} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={place.includes(p)}
                      onChange={() => togglePlace(p)}
                      className="w-4 h-4"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>

  
            {place.includes("OTHER") && (
              <input
                type="text"
                placeholder="Enter custom place"
                value={customPlace}
                onChange={(e) => setCustomPlace(e.target.value)}
                className="w-full p-2 mb-3 border rounded bg-white border-gray-300"
              />
            )}

           
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

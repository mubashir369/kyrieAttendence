"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, CalendarPlus, RefreshCw } from "lucide-react";
import EmployeeNavbar from "@/components/employee/EmployeeNavbar";
import MarkAttendanceModal from "@/components/admin/modals/MarkAttendanceModal";
import { useSession } from "next-auth/react";

export default function EmployeeDashboard() {
  const { data: session } = useSession();
  const [isMarkedToday, setIsMarkedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  useEffect(() => {
    async function checkTodayAttendance() {
      if (!session?.id) return;

      setLoading(true);
      const today = new Date().toISOString().split("T")[0];

      try {
        const res = await fetch(
          `/api/employee/check-attendance?employeeId=${session.id}&date=${today}`
        );
        const data = await res.json();

        setIsMarkedToday(data.status || false);
      } catch (err) {
        console.error("Error checking attendance:", err);
        setIsMarkedToday(false);
      } finally {
        setLoading(false);
      }
    }

    checkTodayAttendance();
  }, [session?.id]);

  const handleChangeAttendance = () => {
    setIsAttendanceOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <EmployeeNavbar />

      <motion.div
        className="max-w-3xl mx-auto mt-16 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl text-center flex-1"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Employee Attendance Panel
        </h1>

        {loading ? (
          <motion.p
            className="text-blue-600 dark:text-blue-400 text-lg font-medium"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Checking your attendance status...
          </motion.p>
        ) : isMarkedToday ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
          >
            <div className="flex flex-col items-center">
              <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
              <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
                Your attendance for today is already marked ✅
              </h2>
              <div className="flex gap-4 flex-wrap justify-center">
                <button
                  onClick={handleChangeAttendance}
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md"
                >
                  <RefreshCw className="w-5 h-5" />
                  Change Attendance
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-800 dark:text-gray-300 mb-6 text-lg font-medium">
              You haven’t marked your attendance today yet.
            </p>
            <button
              onClick={() => setIsAttendanceOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-110 shadow-lg"
            >
              Mark Attendance Now
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Small Floating Button - Always visible at the bottom */}
      <motion.div
        className="flex justify-center mt-6 mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => setIsAttendanceOpen(true)}
          className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition-all transform hover:scale-105 shadow-md"
        >
          <CalendarPlus className="w-4 h-4" />
          Add Another Date Attendance
        </button>
      </motion.div>

      {isAttendanceOpen && (
        <MarkAttendanceModal onClose={() => setIsAttendanceOpen(false)} />
      )}
    </div>
  );
}

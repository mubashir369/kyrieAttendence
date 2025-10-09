import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    await connectDB();

    // Read the date from query string: /api/dashboard?date=2025-10-09
    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get("date");

    // Set start and end of the day
    const todayStart = dateStr ? new Date(dateStr) : new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    // Fetch all active employees
    const activeEmployees = await User.find({ status: "active" }).select(
      "_id name email department role"
    );

    // Fetch attendance for that day
    const todaysAttendance = await Attendance.find({
      date: { $gte: todayStart, $lte: todayEnd },
    }).select("employeeId status");

    // Build a quick lookup
    const attendanceMap = new Map<string, string>();
    todaysAttendance.forEach((att) => {
      attendanceMap.set(att.employeeId.toString(), att.status);
    });

    // Determine unmarked and leave employees
    const unMarkedEmployees = activeEmployees.filter(
      (emp) => !attendanceMap.has(emp._id.toString())
    );

    const leaveEmployees = activeEmployees.filter(
      (emp) => attendanceMap.get(emp._id.toString()) === "absent"
    );

    // Stats summary
    const totalEmployees = activeEmployees.length;
    const totalHR = activeEmployees.filter((emp) => emp.role === "hr").length;
    const leavesToday = leaveEmployees.length;
    const presentEmployees = todaysAttendance.filter(
      (att) => att.status === "present"
    ).length;
    const unMarked = unMarkedEmployees.length;

    return NextResponse.json({
      stats: { totalEmployees, totalHR, leavesToday, presentEmployees, unMarked },
      unMarkedEmployees,
      leaveEmployees,
    });
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}

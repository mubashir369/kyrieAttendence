// File: src/app/api/admin/dashboard/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User"; // Users collection
import Attendance from "@/models/Attendance"; // Attendances collection

export async function GET(req: Request) {
  try {
    await connectDB();

    // 1. Total Employees
    const totalEmployees = await User.countDocuments({ status: "active" });

    // 2. Total HR
    const totalHR = await User.countDocuments({ role: "hr", status: "active" });

    // 3. Leaves Today (status == absent)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const leavesToday = await Attendance.countDocuments({
      date: today,
      status: "absent",
    });

    // 4. Present Employees
    const presentEmployees = await Attendance.countDocuments({
      date: today,
      status: "present",
    });

    // 5. Unmarked Attendances
    const employees = await User.find({ status: "active" }, "_id");
    const markedToday = await Attendance.find(
      { date: today },
      "employeeId"
    ).lean();

    const markedIds = markedToday.map((a) => a.employeeId.toString());
    const unMarked = employees.filter(
      (e) => !markedIds.includes(e._id.toString())
    ).length;

    return NextResponse.json({
      totalEmployees,
      totalHR,
      leavesToday,
      presentEmployees,
      unMarked,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";
import dayjs from "dayjs";

export async function GET(
  req: Request,
  context: { params: Promise<{ employeeId: string; month: string }> }
) {
  await connectDB();
  const { employeeId, month } = await context.params; // Await the params promise

  try {
    const startOfMonth = dayjs(`${month}-01`);
    const endOfMonth = startOfMonth.endOf("month");
    const daysInMonth = endOfMonth.date();

    const startDate = startOfMonth.toDate();
    const endDate = endOfMonth.toDate();

    const records = await Attendance.find({
      employeeId,
      date: { $gte: startDate, $lte: endDate },
    });

    // Convert DB data to map
    const attendanceMap: Record<string, string> = {};
    records.forEach((r) => {
      const dateStr = dayjs(r.date).format("YYYY-MM-DD");
      attendanceMap[dateStr] = r.status; // present | absent | weeklyOff
    });

    // Fill missing days with "notMarked"
    const result: Record<string, string> = {};
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = startOfMonth.date(i).format("YYYY-MM-DD");
      result[currentDate] = attendanceMap[currentDate] || "notMarked";
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });
  }
}

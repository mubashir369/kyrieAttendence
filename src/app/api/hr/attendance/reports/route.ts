import { NextRequest, NextResponse } from "next/server";
import Attendance from "@/models/Attendance";
import { connectDB } from "@/lib/db";


interface DateFilter {
  $gte?: Date;
  $lte?: Date;
}

interface AttendanceFilter {
  date?: DateFilter;

}

export async function GET(req: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const filter: AttendanceFilter = {}; 

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (type) {
    case "today":
      const start = new Date();
      start.setHours(0, 0, 0, 0); 
      const end = new Date();
      end.setHours(23, 59, 59, 999); 

      filter.date = { $gte: start, $lte: end };
      break;

    case "monthly":
      const monthParam = searchParams.get("month") || `${today.getMonth() + 1}`;
      const yearParam = searchParams.get("year") || `${today.getFullYear()}`;
      
      const month = parseInt(monthParam);
      const year = parseInt(yearParam);
      
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0, 23, 59, 59);
      filter.date = { $gte: firstDay, $lte: lastDay };
      break;

    case "period":
      const from = searchParams.get("from");
      const to = searchParams.get("to");
      if (from && to) {
        filter.date = { $gte: new Date(from), $lte: new Date(to) };
      }
      break;

    default:
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
  }

  try {
    const records = await Attendance.find(filter)
      .populate("employeeId", "name email role department")
      .sort({ date: -1 });

    const totalEmployees = await Attendance.distinct("employeeId"); 
    

    const presentEmployees = records.filter(r => r.status === "present").length;

    return NextResponse.json({
      totalEmployees: totalEmployees.length,
      presentEmployees,
      records,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch report" }, { status: 500 });
  }
}

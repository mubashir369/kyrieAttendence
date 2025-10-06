import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const employeeId = req.nextUrl.searchParams.get("employeeId");
    const dateStr = req.nextUrl.searchParams.get("date"); 

    if (!employeeId || !dateStr) {
      return NextResponse.json({ error: "Employee ID and date are required" }, { status: 400 });
    }

    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId,
      date: { $eq: date },
    });

    if (attendance) {
      return NextResponse.json({ status: true, attendance });
    } else {
      return NextResponse.json({ status: false });
    }
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

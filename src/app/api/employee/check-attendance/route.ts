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
  } catch (err) { // Type is implicitly 'unknown', fixing the error on line 29
    console.error(err);
    
    // Safely access the error message using a type guard
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// File: src/app/api/admin/attendance/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { employeeId, date, status, place, inTime, outTime } = await req.json();

    if (!employeeId || !date || !status) {
      return NextResponse.json(
        { message: "Employee, date and status are required" },
        { status: 400 }
      );
    }

    const attendance = await Attendance.create({
      employeeId,
      date: new Date(date),
      status,
      place: place || "",
      inTime: inTime ? new Date(`${date}T${inTime}`) : undefined,
      outTime: outTime ? new Date(`${date}T${outTime}`) : undefined,
    });

    return NextResponse.json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to mark attendance" }, { status: 500 });
  }
}

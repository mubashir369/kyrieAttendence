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

    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0); 

    
    let attendance = await Attendance.findOne({
      employeeId,
      date: dateObj,
    });

    if (attendance) {
    
      attendance.status = status;
      attendance.place = Array.isArray(place) ? place : place ? [place] : [];
      attendance.inTime = inTime ? new Date(`${date}T${inTime}`) : undefined;
      attendance.outTime = outTime ? new Date(`${date}T${outTime}`) : undefined;
      await attendance.save();
    } else {
    
      attendance = await Attendance.create({
        employeeId,
        date: dateObj,
        status,
        place: Array.isArray(place) ? place : place ? [place] : [],
        inTime: inTime ? new Date(`${date}T${inTime}`) : undefined,
        outTime: outTime ? new Date(`${date}T${outTime}`) : undefined,
      });
    }

    return NextResponse.json({
      message: "Attendance marked successfully",
      attendance,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to mark attendance" },
      { status: 500 }
    );
  }
}

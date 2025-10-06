import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attendance from "@/models/Attendance";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Attendance ID is required" }, { status: 400 });
    }

    const attendance = await Attendance.findById(id);
    if (!attendance) {
      return NextResponse.json({ message: "Attendance not found" }, { status: 404 });
    }

    await attendance.deleteOne();

    return NextResponse.json({ message: "Attendance deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

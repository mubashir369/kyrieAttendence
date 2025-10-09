import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // Await the promise for id
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; // Await the promise for id
    const data = await req.json();

    const updatedEmployee = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedEmployee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Employee updated successfully", employee: updatedEmployee });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

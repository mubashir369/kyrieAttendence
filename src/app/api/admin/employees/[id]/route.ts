import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; 


    const data: Partial<{
      name: string;
      email: string;
      phone: string;
      department: string;
      defaultBranch: string;
      salary: number;
      salaryType: "fixed" | "hourly";
      leaveSalary: number;
    }> = await req.json();

    const updatedEmployee = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedEmployee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (err: unknown) {
    console.error(err);
  let message = "Server error";
  if (err instanceof Error) {
    message = err.message;
  }
  return NextResponse.json(
    { message },
    { status: 500 }
  );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params; 

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (err: unknown) {
   console.error(err);
  let message = "Server error";
  if (err instanceof Error) {
    message = err.message;
  }
  return NextResponse.json(
    { message },
    { status: 500 }
  );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();

    const {
      name,
      email,
      phone,
      password,
      role,
      salary,
      salaryType,
      leaveSalary,
      workingHoursPerDay,
      workingDaysPerMonth,
      department,
      defaultBranch,
    } = data;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      salary,
      salaryType,
      status: "active",
      leaveSalary,
      workingHoursPerDay,
      workingDaysPerMonth,
      department,
      defaultBranch,
    });

    await newUser.save();

    return NextResponse.json({ message: "Employee added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

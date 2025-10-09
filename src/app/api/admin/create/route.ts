import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
  
    
    const { name, email, password, role } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, 
      salary: 0,
      salaryType: "fixed",
      status:"active",
      leaveSalary: 0,
      workingHoursPerDay: 8,
      workingDaysPerMonth: 26,
      department:""
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error: unknown) {
  let message = "Server error";
  if (error instanceof Error) {
    message = error.message;
  }
  return NextResponse.json({ error: message }, { status: 500 });
}
}

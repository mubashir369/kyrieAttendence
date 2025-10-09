import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";


export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { password } = await req.json();
    const { id } = await context.params; 

    // if (!password || password.length < 6) {
    //   return NextResponse.json(
    //     { message: "Password must be at least 6 characters long" },
    //     { status: 400 }
    //   );
    // }
      if (!password ) {
      return NextResponse.json(
        { message: "Please Enter Password" },
        { status: 400 }
      );
    }


    await connectDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Password reset successfully",
      employee,
    });
  }  catch (err) {
    console.error("Reset password error:", err);

   
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    }
    
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

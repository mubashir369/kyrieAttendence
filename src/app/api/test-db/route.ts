import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: "✅ MongoDB connected successfully" });
  } catch (err) {
    return NextResponse.json({ message: "❌ MongoDB connection failed", error: err });
  }
}

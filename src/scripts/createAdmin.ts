const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { connectDB } = require("../lib/db");

async function createAdmin() {
  await connectDB();

  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await User.create({
    name: "Dummy Admin",
    email: "admin@example.com",
    password: hashedPassword,
    role: "admin",
    salary: 0,
    salaryType: "fixed",
    leaveSalary: 0,
    workingHoursPerDay: 8,
    workingDaysPerMonth: 26,
  });

  console.log("Dummy admin created:", admin);
  process.exit(0);
}

createAdmin();

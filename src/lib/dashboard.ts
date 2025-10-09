
import Attendance from "@/models/Attendance";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function getDashboardData(dateStr?: string) {
 
  
  await connectDB();
const todayStart = dateStr ? new Date(dateStr) : new Date();
 console.log(todayStart,"backssssssssssssssssssssssssssssfro",dateStr);

  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

 
  const activeEmployees = await User.find({ status: "active" }).select(
    "_id name email department role"
  );


  const todaysAttendance = await Attendance.find({
    date: { $gte: todayStart, $lte: todayEnd },
  }).select("employeeId status");


  const attendanceMap = new Map<string, string>();
  todaysAttendance.forEach((att) => {
    attendanceMap.set(att.employeeId.toString(), att.status);
  });

 
  const unMarkedEmployees = activeEmployees.filter(
    (emp) => !attendanceMap.has(emp._id.toString())
  );

  const leaveEmployees = activeEmployees.filter(
    (emp) => attendanceMap.get(emp._id.toString()) === "absent"
  );

  // Stats
  const totalEmployees = activeEmployees.length;
  const totalHR = activeEmployees.filter((emp) => emp.role === "hr").length;
  const leavesToday = leaveEmployees.length;
  const presentEmployees = todaysAttendance.filter(
    (att) => att.status === "present"
  ).length;
  const unMarked = unMarkedEmployees.length;

  return {
    stats: { totalEmployees, totalHR, leavesToday, presentEmployees, unMarked },
    unMarkedEmployees,
    leaveEmployees,
  };
}

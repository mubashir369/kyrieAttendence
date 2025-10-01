import mongoose, { Schema, model, models } from "mongoose";

interface AttendanceDoc {
  employeeId: mongoose.Types.ObjectId;
  date: Date;
  inTime?: Date;
  outTime?: Date;
  status: "present" | "absent";
  place: string; 
}

const attendanceSchema = new Schema<AttendanceDoc>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    inTime: { type: Date },
    outTime: { type: Date },
    status: { type: String, enum: ["present", "absent"], required: true },
    place: { type: String }, 
  },
  { timestamps: true }
);

const Attendance = models.Attendance || model<AttendanceDoc>("Attendance", attendanceSchema);

export default Attendance;

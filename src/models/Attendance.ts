import mongoose, { Schema, model, models, Document } from "mongoose";

interface AttendanceDoc extends Document {
  employeeId: mongoose.Types.ObjectId;
  date: Date;
  inTime?: Date;
  outTime?: Date;
  status: "present" | "absent";
  place: string[];
}

const attendanceSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  inTime: { type: Date },
  outTime: { type: Date },
  status: { type: String, enum: ["present", "absent"], required: true },
  place: { type: [String], default: [] }, // array of strings
}, { timestamps: true });

const Attendance = models.Attendance || model<AttendanceDoc>("Attendance", attendanceSchema);

export default Attendance;

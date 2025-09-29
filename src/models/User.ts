import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "hr", "employee"], default: "employee" },

 
  salary: { type: Number, default: 0 }, 
  salaryType: { type: String, enum: ["fixed", "hourly"], default: "fixed" }, 
  leaveSalary: { type: Number, default: 0 }, 

 
  workingHoursPerDay: { type: Number, default: 8 },
  workingDaysPerMonth: { type: Number, default: 26 }, 
});

export default models.User || model("User", UserSchema);

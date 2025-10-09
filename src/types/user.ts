
export interface AppUser {
  _id: string; 
  employeeId: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "hr" | "employee";
  status?: string;
  salary: number;
  salaryType: "fixed" | "hourly";
  leaveSalary: number;
  workingHoursPerDay: number;
  workingDaysPerMonth: number;
  department?: string;
  defaultBranch: string;
  phone: string;
}

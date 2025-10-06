"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import branches from "@/data/branches.json";

export default function AddEmployeePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "employee",
    department: "",
    defaultBranch: "VSM",
    salary: 0,
    salaryType: "fixed",
    leaveSalary: 0,
    workingHoursPerDay: 8,
    workingDaysPerMonth: 26,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/employees/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setLoading(false);

    if (res.ok) {
      alert("Employee added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "employee",
        department: "",
        defaultBranch: "VSM",
        salary: 0,
        salaryType: "fixed",
        leaveSalary: 0,
        workingHoursPerDay: 8,
        workingDaysPerMonth: 26,
      });
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add employee");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Employee</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Row: Default Branch + Department + Role */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Default Branch</label>
            <select
              name="defaultBranch"
              value={formData.defaultBranch}
              onChange={handleChange}
              className="w-full p-3 border text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {branches.map((branch) => (
    <option key={branch} value={branch}>
      {branch}
    </option>
  ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="Department"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Password / Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Salary Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Salary Type</label>
            <select
              name="salaryType"
              value={formData.salaryType}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="fixed">Fixed</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Leave Salary</label>
            <input
              type="number"
              name="leaveSalary"
              value={formData.leaveSalary}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Working Hours / Days */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Working Hours/Day</label>
            <input
              type="number"
              name="workingHoursPerDay"
              value={formData.workingHoursPerDay}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Working Days/Month</label>
            <input
              type="number"
              name="workingDaysPerMonth"
              value={formData.workingDaysPerMonth}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}

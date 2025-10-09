"use client";

import { useState } from "react";

import branches from "@/data/branches.json";
import { Crown } from "lucide-react";
import PremiumOptionsModal from "@/components/modals/PremiumOptionsModal";

export default function AddEmployeePage() {
 
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
    employeeId:"",
    workingHoursPerDay: 8,
    workingDaysPerMonth: 26,
    
  });

  const [loading, setLoading] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const premiumFields = [
      "salary",
      "salaryType",
      "leaveSalary",
      "workingHoursPerDay",
      "workingDaysPerMonth",
      "checkIn",
      "checkOut",
    ];


    if (premiumFields.includes(name)) {
      setIsPremiumOpen(true);
      return;
    }

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
        employeeId:"",
        workingHoursPerDay: 8,
        workingDaysPerMonth: 26,
      
      });
    } else {
      const data = await res.json();
      alert(data.error || "Failed to add employee");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Add Employee</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-6">
  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Employee ID */}
    <div>
      <label className="block mb-1 font-medium">Employee ID</label>
      <input
        type="text"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        required
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

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

    {/* Email */}
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

    {/* Phone */}
    <div>
      <label className="block mb-1 font-medium">Phone</label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Department */}
    <div>
      <label className="block mb-1 font-medium">Department</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Default Branch */}
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
  </div>

  {/* Password Fields */}
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
</div>


        {/* Premium Fields */}
     <div className="bg-yellow-100 border-2 border-yellow-400 p-6 rounded-xl shadow-md space-y-6">
  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-800">
    Premium Features <Crown className="w-5 h-5 text-yellow-600" />
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {["salary", "salaryType", "leaveSalary"].map((field) => (
      <div key={field}>
        <label className="block mb-1 font-medium flex items-center gap-1 text-yellow-800">
          {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}{" "}
          <Crown className="w-4 h-4 text-yellow-600" />
        </label>
        {field === "salaryType" ? (
          <select
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-not-allowed bg-yellow-200 text-yellow-900"
            disabled
          >
            <option value="fixed">Fixed</option>
            <option value="hourly">Hourly</option>
          </select>
        ) : (
          <input
            type="number"
            name={field}
            value={formData[field as keyof typeof formData]}
            onChange={handleChange}
            placeholder="Premium Feature"
            disabled
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-200 text-yellow-900 cursor-not-allowed"
          />
        )}
      </div>
    ))}
  </div>

  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {["workingHoursPerDay", "workingDaysPerMonth","checkIn", "checkOut"].map((field) => (
      <div key={field}>
        <label className="block mb-1 font-medium flex items-center gap-1 text-yellow-800">
          {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}{" "}
          <Crown className="w-4 h-4 text-yellow-600" />
        </label>
        <input
          type="number"
          name={field}
          value={formData[field as keyof typeof formData]}
          onChange={handleChange}
          placeholder="Premium Feature"
          disabled
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-200 text-yellow-900 cursor-not-allowed"
        />
      </div>
    ))}
  </div>

 
</div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>

      {isPremiumOpen && <PremiumOptionsModal onClose={() => setIsPremiumOpen(false)} />}
    </div>
  );
}

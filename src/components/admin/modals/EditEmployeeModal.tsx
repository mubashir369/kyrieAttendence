"use client";
import React, { useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";

interface Employee {
  _id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  salaryType: string;
  leaveSalary: number;
  workingHoursPerDay: number;
  workingDaysPerMonth: number;
  status: string;
}

interface EditEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onUpdate: (data: Employee) => void;
}

export default function EditEmployeeModal({
  isOpen,
  onClose,
  employee,
  onUpdate,
}: EditEmployeeModalProps) {
  // 👇 use one form state instead of multiple
  const [formState, setFormState] = useState<Employee | null>(null);

  useEffect(() => {
    if (employee) {
      setFormState(employee);
    }
  }, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formState) return;
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState) return;
    onUpdate(formState);
    onClose();
  };

  if (!formState) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-full text-gray-900 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            className="p-2 border rounded"
            value={formState.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            className="p-2 border rounded"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="department"
            className="p-2 border rounded"
            value={formState.department}
            onChange={handleChange}
            placeholder="Department"
          />
          <select
            name="role"
            className="p-2 border rounded"
            value={formState.role}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
            <option value="hr">HR</option>
            <option value="employee">Employee</option>
          </select>
          {/* 👇 you can easily add salary, working hours, etc. later */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}

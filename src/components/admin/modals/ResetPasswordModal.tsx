"use client";
import { useState } from "react";

interface Props {
  employee: any;
  onClose: () => void;
}

export default function ResetPasswordModal({ employee, onClose }: Props) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (password !== confirm) return alert("Passwords do not match");
    setLoading(true);
    try {
      await fetch(`/api/admin/employees/${employee._id}/reset-password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      onClose();
      alert("Password reset successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-6 w-96 shadow-2xl relative">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:border-gray-600"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:border-gray-600"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset"}
          </button>
        </div>
      </div>
    </div>
  );
}

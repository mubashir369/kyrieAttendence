"use client";

interface Employee {
  _id: string;
  name: string;
  email?: string;
  role?: string;
}

interface Props {
  employee: Employee;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function DeleteEmployeeModal({ employee, onClose, onDelete }: Props) {
  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/employees/${employee._id}`, { method: "DELETE" });
      onDelete(employee._id);
      onClose();
    } catch (err: unknown) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg p-6 w-96 shadow-2xl relative">
        <h2 className="text-xl font-bold mb-4">Delete Employee</h2>
        <p className="mb-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{employee.name}</span>?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

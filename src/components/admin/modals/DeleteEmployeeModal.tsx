"use client";

interface Props {
  employee: any;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function DeleteEmployeeModal({ employee, onClose, onDelete }: Props) {
  const handleDelete = async () => {
    try {
      await fetch(`/api/admin/employees/${employee._id}`, { method: "DELETE" });
      onDelete(employee._id);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Delete Employee</h2>
        <p>Are you sure you want to delete {employee.name}?</p>
        <div className="flex justify-end space-x-2 mt-4">
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

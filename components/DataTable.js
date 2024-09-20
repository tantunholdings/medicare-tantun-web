import React from "react";

const DataTable = ({ data, onEdit, onDelete, itemType }) => {
  return (
    <table className="min-w-full bg-white w-full">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Title</th>
          <th className="py-2 px-4 border-b">Created Date</th>
          <th className="py-2 px-4 border-b">Status</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-4 border-b">{item.title}</td>
            <td className="py-2 px-4 border-b">
              {new Date(item.created_at).toLocaleDateString()}
            </td>
            <td className="py-2 px-4 border-b">
              {item.draft ? "Draft" : "Published"}
            </td>
            <td className="py-2 px-4 border-b">
              <button
                onClick={() => onEdit(item.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;

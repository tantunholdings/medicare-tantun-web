import React from "react";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const AdminSideBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the authentication token from cookies
    Cookies.remove("token");
    router.push("/login"); // Redirect to login after logout
  };

  return (
    <div className="w-1/6 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <a href="/blog/new" className="hover:text-gray-400">
            Add New Blog
          </a>
        </li>
        <li>
          <a href="/faq/new" className="hover:text-gray-400">
            Add New FAQ
          </a>
        </li>
        <li>
          <a href="/blog/edit" className="hover:text-gray-400">
            Edit Blogs
          </a>
        </li>
        <li>
          <a href="/faq/edit" className="hover:text-gray-400">
            Edit FAQs
          </a>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-600 py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;

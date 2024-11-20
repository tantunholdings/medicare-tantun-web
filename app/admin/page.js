'use client';
import AdminSideBar from '../../components/AdminSideBar'

export default function AdminDashboard() {

  return (
    <div className="flex min-h-screen">
    <AdminSideBar />
      {/* Admin Dashboard Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold">Welcome, Admin!</h1>
        <p className="mt-6 text-xl">Use the menu on the left to manage blogs and FAQs.</p>
      </div>
    </div>
  );
}

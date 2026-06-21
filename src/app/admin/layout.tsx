import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    // If not logged in, render the login page directly without the sidebar shell
    return <>{children}</>;
  }

  // If logged in, render the sidebar and admin dashboard structure
  return (
    <div className="min-h-screen bg-navy-950 text-slate-300">
      <AdminSidebar />
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <main className="p-6 sm:p-10 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}

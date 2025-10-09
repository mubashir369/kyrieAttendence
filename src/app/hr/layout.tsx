
import CompanyHeader from "@/components/CompanyHeader";
import Footer from "@/components/Footer";
import HrNavbar from "@/components/hr/HrNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      {/* Company Info Header */}
      <CompanyHeader />

      {/* Navbar */}
      {/* <AdminNavbar /> */}
      <HrNavbar/>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Sidebar (optional) */}
        {/* <AdminSidebar /> */}

        {/* Page content */}
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">{children}</main>
       
      </div>
       <Footer/>
    </div>
  );
}

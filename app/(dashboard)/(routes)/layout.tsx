import React from "react";
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* <Header /> */}
      <div className="h-[80px] lg:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden lg:flex w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="lg:pl-56 h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;

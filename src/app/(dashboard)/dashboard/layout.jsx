import { DashboardSidebar } from "@/components/__oneTime/Dashboard/DashboardSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function DashboardLayout({ children }) {
  return (
    <div className="flex flex-row p-3 gap-3 h-screen">
      <aside
        //     className="max-h-screen w-60 p-5 bg-gray-3 border border-gray-2
        //   rounded-lg sticky top-0 max-md:hidden overflow-scroll"
        // className="bg-gray-800"
      >
        <DashboardSidebar />
      </aside>
      <main className="flex-1 bg-gray-3 border border-gray-2  rounded-lg  max-h-screen overflow-auto pb-5 ">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}

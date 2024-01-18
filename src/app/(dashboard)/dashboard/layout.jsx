import { DashboarMainPageComponent } from "@/components/__oneTime/Dashboard/DashboarMainPageComponent";
import getCurrentUser from "@/lib/session";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();


  return (
    <div className="flex flex-row p-3 gap-3 h-screen">
      <DashboarMainPageComponent children={children} user={user} />
      <ToastContainer position="top-right" />
    </div>
  );
}

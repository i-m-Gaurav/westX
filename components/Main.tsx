import Sidebar from "@/components/Sidebar";
import MainFeed from "@/components/MainFeed";
import RightSidebar from "@/components/RightSidebar";

export default function Main() {
  return (
    <>
      <div className="flex justify-center">
        <Sidebar />
        <MainFeed />
        <RightSidebar />
      </div>
    </>
  );
}

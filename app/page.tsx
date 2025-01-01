'use client';
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Main from "@/components/Main";
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a loading spinner component

export default function Home() {
  const { data: session, status } = useSession();

  // Show a loading spinner while the session is being checked
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner /> {/* Replace with your loading spinner */}
      </div>
    );
  }

  return (
    <>
      {!session ? <Login /> : <Main />}
    </>
  );
}
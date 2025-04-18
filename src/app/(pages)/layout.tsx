"use client";
import appWriteService, { AppWriteService } from "@/lib/appwrite";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/authcontext";
import React, { useState, useEffect, Children } from "react";

const Spinner = () => (
  <div className="flex justify-center items-center py-4">
    <div className="h-6 w-6 border-4 border-t-transparent border-purple-500 rounded-full animate-spin" />
  </div>
);

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appWriteService.isLoggedIn()
      .then(setAuthStatus)
      .finally(() => setLoading(false));
  }, [])
  return <AuthProvider value={{ authStatus, setAuthStatus }}>
  {!loading && (
      <>
          <Navbar />
          <main className="px-2 py-4">{children}</main>
      </>
  )}
</AuthProvider>

}

export default ProtectedLayout;

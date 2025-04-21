"use client";
import React, { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";
import appWriteService from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";

const ProfileCard = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const {setAuthStatus} = useAuth();

  useEffect(() => {
    if (!appWriteService.isLoggedIn()) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await appWriteService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-center text-white/70 mt-10">Loading user info...</div>;
  }

  const avatarUrl = ""; // Optional: add user.avatarUrl
  const name = user.name || "Anonymous";
  const email = user.email || "Not available";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <div className="w-full max-w-sm p-6 rounded-3xl shadow-2xl backdrop-blur-2xl bg-white/5 border border-white/10 text-white flex flex-col items-center gap-5 transition-transform transform hover:scale-[1.02] duration-300">
        <div className="relative">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-24 h-24 rounded-full border-4 border-gradient-to-tr from-purple-500 to-blue-500 object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg">
              <UserCircle2 className="w-20 h-20 text-white" />
            </div>
          )}
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-sm text-white/60">{email}</p>
        </div>

        <button
          onClick={async () => {
            await appWriteService.LogoutUser();
            setAuthStatus(false);
            router.push("/");
          }}
          className="px-5 py-2 text-sm bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-all font-medium shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

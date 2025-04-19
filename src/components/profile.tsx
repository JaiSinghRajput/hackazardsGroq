"use client";
import React, { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";
import appWriteService from "@/lib/appwrite";
import { useRouter } from "next/navigation";

const ProfileCard = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  if (!appWriteService.isLoggedIn()) {
    router.push("/login");
  }
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
    return <div className="text-center text-white/70">Loading user info...</div>;
  }

  const avatarUrl = ""; // If you have user.photoUrl or similar, add it
  const name = user.name || "Anonymous";
  const email = user.email || "Not available";

  return (
    <div className="max-w-sm w-full p-6 rounded-2xl shadow-lg backdrop-blur-lg bg-white/5 border border-white/10 text-white flex flex-col items-center gap-4">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-20 h-20 rounded-full border-2 border-purple-500 object-cover"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
          <UserCircle2 className="w-16 h-16 text-purple-300" />
        </div>
      )}

      <div className="text-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-white/70">{email}</p>
      </div>

      <button
        onClick={async () => {
          await appWriteService.LogoutUser();
          router.push("/");
        }}
        className="mt-2 px-4 py-2 text-sm bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition font-medium"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;

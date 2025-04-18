"use client";
import React, { useEffect, useState } from 'react';
import appWriteService from "@/appwrite/config";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { User, Mail, Phone, LogOut } from 'lucide-react'; // Assuming you have lucide-react installed

const MePage = () => {
    const [userData, setUserData] = useState<{
        name?: string;
        email?: string;
        phone?: string;
    }>({});
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await appWriteService.getCurrentUser();
                if (data) {
                    setUserData({
                        name: data.name,
                        email: data.email,
                        phone: data.phone || "Not provided"
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                toast.error("Could not load profile information");
                router.push("/login");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [router]);

    const handleLogout = async () => {
        try {
            await appWriteService.LogoutUser();
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Failed to logout");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
                <div className="p-4 flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    <p className="mt-4 text-white/80">Loading your profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full filter blur-3xl"></div>
            
            <div className="relative w-full max-w-md">
                {/* Profile header with avatar */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg mb-4">
                        <span className="text-white text-3xl font-bold">
                            {userData.name?.charAt(0) || "U"}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white text-center">
                        {userData.name}
                    </h1>
                    <div className="mt-1 px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                        <span className="text-sm text-purple-300">Premium User</span>
                    </div>
                </div>

                {/* Profile card */}
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Card header */}
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-semibold text-white">Profile Details</h2>
                    </div>
                    
                    {/* Card content */}
                    <div className="p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-purple-500/20">
                                <User className="text-purple-300" size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-white/50 mb-1">Full Name</p>
                                <p className="text-white font-medium">{userData.name}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-500/20">
                                <Mail className="text-blue-300" size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-white/50 mb-1">Email Address</p>
                                <p className="text-white font-medium">{userData.email}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-indigo-500/20">
                                <Phone className="text-indigo-300" size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-white/50 mb-1">Phone Number</p>
                                <p className="text-white font-medium">{userData.phone}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Card footer with actions */}
                    <div className="p-6 border-t border-white/10">
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 flex items-center justify-center gap-2 text-white font-medium text-lg bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-md transition duration-300 ease-in-out hover:from-purple-700 hover:to-blue-600 group"
                        >
                            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
                            Sign Out
                        </button>
                    </div>
                </div>
                
                {/* Additional options */}
                <div className="mt-6 flex justify-center gap-4">
                    <button className="text-sm text-white/60 hover:text-white transition-colors">
                        Edit Profile
                    </button>
                    <span className="text-white/30">•</span>
                    <button className="text-sm text-white/60 hover:text-white transition-colors">
                        Account Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MePage;
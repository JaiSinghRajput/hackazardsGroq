"use client";
import useAuth from "@/context/useAuth";
import React from "react";
import { Login } from "@/components/Login";
import { Hero } from "@/components/Hero";
import appWriteService from "@/lib/appwrite";
import { useRouter } from "next/navigation";

const Home = () => {
    const { authStatus } = useAuth();
    return (
        <>
            {authStatus ? (
                <div>
                    <Hero />
                    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4">
                        <h1 className="text-3xl font-bold text-white text-center mb-6">Welcome Back!</h1>
                        <p className="text-white text-center mb-4">You are already logged in.</p>
                        <p className="text-white text-center mb-4">You can start chatting now.</p>
                        <p className="text-white text-center mb-4">Click the button below to go to the chat page.</p>
                        <a href="/chat" className="px-4 py-2 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition">Go to Chat</a>
                        <p className="text-white text-center mb-4">You can also log out if you wish.</p>
                        <a onClick={()=>{
                            appWriteService.LogoutUser();
                            useRouter().refresh();
                        }} className="px-4 py-2 bg-gradient-to-br cursor-pointer from-red-600 to-orange-500 text-white rounded-lg hover:opacity-90 transition">Log Out</a>

                    </div>
                </div>
            ) : (
                <div>
                    <Login />
                </div>
            )}
        </>

    );
}
export default Home;
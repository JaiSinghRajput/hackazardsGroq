"use client";
import useAuth from "@/context/useAuth";
import React from "react";
import { Login } from "@/components/Login";
import { Hero } from "@/components/Hero";
import appWriteService from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import AboutPage from "@/components/About";

const Home = () => {
    const { authStatus } = useAuth();
    return (
        <>
            <div>
                <Hero />
            </div>
        </>

    );
}
export default Home;
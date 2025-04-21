"use client";
import useAuth from "@/context/useAuth";
import React from "react";
import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";

const Home = () => {
    const { authStatus } = useAuth();
    return (
        <>
            <div>
                {/* <Navbar/> */}
                <Hero />
            </div>
        </>

    );
}
export default Home;
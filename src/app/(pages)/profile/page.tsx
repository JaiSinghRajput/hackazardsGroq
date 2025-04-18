"use client";
import ProfileCard from "@/components/profile";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const profilePage = () => {
    const { authStatus} = useAuth();
    if (authStatus) {
        useRouter().push("/login");
    }
    else {
        return <ProfileCard />;
    }
}

export default profilePage;
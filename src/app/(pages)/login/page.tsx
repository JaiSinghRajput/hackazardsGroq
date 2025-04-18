"use client";
import { Login } from "@/components/Login";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const SignupPage = ()=>{
    const router = useRouter();
    const { authStatus } = useAuth();
    if( authStatus) {
        router.replace("/chat");
        return <></>;
    }
    return <Login />;
}

export default SignupPage;
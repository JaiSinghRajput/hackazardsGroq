"use client";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import { Signup } from "@/components/Signup";

const SignupPage = ()=>{
    const router = useRouter();
    const { authStatus } = useAuth();
    if( authStatus) {
        router.replace("/chat");
        return <></>;
    }
    return <Signup />;
}

export default SignupPage;
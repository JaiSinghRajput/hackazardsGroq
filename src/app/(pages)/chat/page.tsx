"use client";
import { ChatBox } from "@/components/ChatBox";
import useAuth from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

const chatPage = ()=>{
    const router = useRouter();
    const { authStatus } = useAuth();
    if( !authStatus) {
        router.replace("/login");
        return <></>;
    }
    return <>
    <ChatBox/>
    </>
}

export default chatPage;
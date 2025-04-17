"use client";
import appWriteService from "@/app/appwrite/config";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";    
import React, { useState,FormEvent } from "react";
import { toast } from "react-hot-toast";

export const Signup = ()=>{
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPass:"",
        name: "",
    });
    const [error, setError] = useState<string | null>(null);
    const {setAuthStatus} = useAuth();
    const create = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if (formData.password !== formData.confirmPass) {
            toast.error("Passwords do not match");
            setError("Passwords do not match");
            return;
        }
        try{
            await appWriteService.createUserAccount(formData);
            setAuthStatus(true);
            router.push("/profile");
        } catch (err:any) {
            setError(err.message);
            toast.error(err.message);
        }
    }

    return (
        <form onSubmit={create}>
            <h1>Signup</h1>
            <div className="flex flex-col gap-4 bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-lg">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPass}
                    onChange={(e) => setFormData({ ...formData, confirmPass: e.target.value })}
                    required
                    className="w-full px-4 py-2 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full mt-4 px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => toast.success("Signup successful!")}
            >
                Signup
            </button>
            <button type="submit">Signup</button>
            {error && <p>{error}</p>}
        </form>
    );
}
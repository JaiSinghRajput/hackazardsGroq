"use client";
import appWriteService from "@/app/appwrite/config";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import { toast } from "react-hot-toast";

export const Login = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await appWriteService.LoginUserAccount(formData);
      setAuthStatus(true);
      router.push("/profile");
      toast.success("Login successful!");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <form
        onSubmit={loginUser}
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full mt-6 py-3 text-white font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-md hover:from-purple-700 hover:to-blue-600 transition duration-300 ease-in-out"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-purple-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

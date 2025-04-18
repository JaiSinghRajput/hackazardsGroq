"use client";
import appWriteService from "@/appwrite/config";
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
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    try {
      const session = await appWriteService.LoginUserAccount(formData);
      if (session) {
        toast.success("Login successful!");
        setAuthStatus(true);
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <form
        onSubmit={loginUser}
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl shadow-2xl"
        aria-labelledby="login-heading"
      >
        <h1 id="login-heading" className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-4 py-3 text-white bg-white/10 border border-white/20 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-invalid={error?.includes("email") ? "true" : "false"}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
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
        </div>

        {error && (
          <p className="text-red-400 text-sm mt-2 text-center" role="alert">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full mt-6 py-3 text-white font-semibold text-lg bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-md transition duration-300 ease-in-out ${
            isLoading 
              ? "opacity-70 cursor-not-allowed" 
              : "hover:from-purple-700 hover:to-blue-600"
          }`}
          aria-busy={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
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

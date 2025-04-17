"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/context/useAuth";

const Navbar = () => {
    const { authStatus } = useAuth(); // Access the auth status from context
    const router = useRouter();
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between shadow-lg rounded-b-lg">
            {/* Logo or brand */}
            <div className="text-white text-2xl font-bold cursor-pointer">
                <Link href="/">MyApp</Link>
            </div>

            {/* Navigation links */}
            <div className="space-x-6">
                <Link
                    href="/"
                    className="text-white text-lg hover:text-yellow-200 transition-all"
                >
                    Home
                </Link>
                <Link
                    href="/profile"
                    className="text-white text-lg hover:text-yellow-200 transition-all"
                >
                    Profile
                </Link>
            </div>

            {/* Optional: Mobile menu icon for small screens */}
            <div className="lg:hidden">
                <button
                    onClick={() => router.push("/profile")}
                    className="text-white text-lg"
                >
                    ☰
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

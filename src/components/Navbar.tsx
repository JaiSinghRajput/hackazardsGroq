import useAuth from "@/context/useAuth";
import Link from "next/link";
import { Sparkles } from "lucide-react";
const Navbar = () => {
  const { authStatus } = useAuth(); // or replace with your actual auth state

  return (
    <nav className="w-full backdrop-blur-lg bg-white/5 border-b border-white/10 shadow-sm fixed top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-purple-300 hover:text-purple-400 transition-all">
          <Sparkles className="w-5 h-5" />
          <span className="font-bold text-lg tracking-wide">Groqify</span>
        </Link>

        {/* Nav Links */}

        {authStatus && (

          <div className="hidden md:flex items-center gap-6 text-white/80 text-sm font-medium">
            <Link href="/chat" className="hover:text-purple-400 transition">chat</Link>
            <Link href="/profile" className="hover:text-purple-400 transition">Profile</Link>
          </div>
        )}

        <Link
          href={authStatus ? "/chat" : "/login"}
          className="ml-4 px-4 py-2 text-sm bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition hidden md:inline-block"
        >
          {authStatus ? "Start Chatting" : "Login"}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

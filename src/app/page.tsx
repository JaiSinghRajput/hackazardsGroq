import Image from "next/image";
import { Signup } from "@/components/Signup";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="text-4xl font-bold text-center">Welcome to the Groq App</h1>
      <p className="mt-4 text-lg text-center">Your one-stop solution for all your needs.</p>
      <Signup />
      <div className="relative w-full max-w-lg mt-10">
        <Image
          src="/images/hero-image.png"
          alt="Hero Image"
          layout="fill"
          objectFit="contain"
          className="rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}

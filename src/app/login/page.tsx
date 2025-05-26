"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { manualLogin } from "@/utils/auth";
import Link from "next/link";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await manualLogin(formData.email, formData.password);
  };

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gradient-to-br from-blue-900 via-black to-purple-900 border border-blue-500 relative neon-border">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-cyan-400 drop-shadow-lg">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 bg-black border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-cyan-200 text-cyan-100"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 bg-black border border-cyan-400 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-cyan-200 text-cyan-100"
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-cyan-500 hover:bg-cyan-400 transition duration-300 text-black font-bold shadow-md"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm">or login with</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => signIn("github")}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
            >
              GitHub
            </button>
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded"
            >
              Google
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/signin" className="text-sm text-cyan-400 hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>

       
      </div>

      <style jsx>{`
        .neon-border {
          box-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff,
            0 0 40px #0ff;
          animation: flicker 2s infinite alternate;
        }

        @keyframes flicker {
          0% {
            box-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
          }
          100% {
            box-shadow: 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;

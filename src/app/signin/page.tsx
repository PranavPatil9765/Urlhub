"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { registerUser } from "@/utils/auth";
import Link from "next/link";

const SignIn = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password, name } = formData;
    await registerUser(email, password, name);
  };

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gradient-to-br from-purple-900 via-black to-blue-900 border border-purple-500 neon-border relative">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-400 drop-shadow-lg">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 bg-black border border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-200 text-purple-100"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 bg-black border border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-200 text-purple-100"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-6 bg-black border border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-200 text-purple-100"
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-purple-500 hover:bg-purple-400 transition duration-300 text-black font-bold shadow-md"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-purple-300">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 underline hover:text-purple-300">
            Log in instead
          </Link>
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm">or sign up with</p>
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

       
      </div>

      <style jsx>{`
        .neon-border {
          box-shadow: 0 0 10px #d946ef, 0 0 20px #d946ef, 0 0 30px #d946ef,
            0 0 40px #d946ef;
          animation: flicker 2s infinite alternate;
        }

        @keyframes flicker {
          0% {
            box-shadow: 0 0 5px #d946ef, 0 0 10px #d946ef;
          }
          100% {
            box-shadow: 0 0 20px #d946ef, 0 0 30px #d946ef, 0 0 40px #d946ef;
          }
        }
      `}</style>
    </div>
  );
};

export default SignIn;

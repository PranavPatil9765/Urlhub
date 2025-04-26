"use client"; // If using Next.js App Router
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {useSession, signIn ,signOut } from "next-auth/react";
import { manualLogin } from "@/utils/auth";
import Link from "next/link";
const Login = () => {
  const {data:session} = useSession(); 
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await manualLogin(formData.email, formData.password);

  };
 useEffect(()=>{
     console.log("Session:", session); // Debug session state
     if (session) {
       router.push("/dashboard");
     }
     },[session])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-blue-950 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        
        <input 
          placeholder="Email" 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="border p-2 w-full mb-2 rounded"
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          className="border p-2 w-full mb-4 rounded"
        />
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Submit
        </button>


        
      </form>
      <Link href={"/signin"}>
      <button className="text-black">SIGN IN</button>
      </Link>
        <button className="text-black" onClick={() => signIn("github")}>Login With GitHub</button>
      <button className="text-black" onClick={() => signIn("google")}>Login with with Google</button>
      <button className="text-black" onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Login;
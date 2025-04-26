"use client"; // If using Next.js App Router
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {useSession, signIn ,signOut } from "next-auth/react";
import { registerUser,manualLogin } from "@/utils/auth";
import Link from "next/link";
const SignIn = () => {
    const {data:session} = useSession(); 
  
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" ,name:""});

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const {email,password,name} = formData;
      await registerUser(email,password,name);
    // if(res.status==201){
    //   router.push('/dashboard')
    // }
  };

  useEffect(()=>{
    console.log("Session:", session); // Debug session state
    if (session) {
      router.push("/dashboard");
    }
    },[session])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen rounded-2xl ">
      <div className="bg-cyan-700">

      <form 
        onSubmit={handleSubmit} 
        className="bg-cyan-700 p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl  font-bold text-center mb-4 shadow-2xl">Sign In</h2>
        
        <input 
          placeholder="Name" 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          className="border p-2 w-full mb-2 rounded"
        />
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

      <Link href={"/login"} className="text-center flex justify-center items-center w-full">
      <button className="text-black block btn btn-dash ">Log IN instead</button>
      </Link>
      <div className="flex justify-center items-center gap-3">

        <button className="text-black btn" onClick={() => signIn("github")}> GitHub</button>
      <button className="text-black btn btn-soft  " onClick={() => signIn("google")}>Google</button>
      </div>
    
    </div>
    </div>

  );
};

export default SignIn;
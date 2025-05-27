import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import User from "@/libs/models/user_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password ,name} = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token for session
    const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    // ✅ Properly setting the cookie using `NextResponse`
    const response = NextResponse.json({
      message: "User registered successfully",
      token,
    });

    response.headers.set(
      "Set-Cookie",
      `session_token=${token};`
    );

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
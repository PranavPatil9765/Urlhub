import { connectDB } from "@/libs/db";
import Url from "@/libs/models/url_model";
import { log } from "console";
import { NextResponse } from "next/server";
import { env } from "process";
import { getServerSession } from "next-auth";

export async function POST(req: Request){
    const { url , alias } = await req.json();
    if(url){
        try {
            const session = await getServerSession(); // Ensure the session is available
            const useremail = session?.user?.email; // Get the user's email from the session
            if (!useremail) {
                return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
            }
            await connectDB(); // Ensure the database connection is established
            let shortUrl = Math.random().toString(36).substring(2, 8); // Generate a random short URL
            if(alias){
                shortUrl = alias + shortUrl;
            }
            const newUrl = new Url({ originalUrl: url, shortUrl, Alias: alias, email: useremail });
            await newUrl.save();
            return NextResponse.json({ message: "URL shortened successfully", newUrl }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }
    return NextResponse.json({ message: "URL and alias are required" }, { status: 400 });
} 
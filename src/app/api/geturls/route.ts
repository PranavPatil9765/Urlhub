import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import  url  from "@/libs/models/url_model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../libs/authOptions"; // Adjust path if needed
import { log } from "console";
export async function GET(req: Request) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }
    try {
        await connectDB(); // Ensure the database connection is established
        const useremail = session?.user?.email;
        const res = await url.find({ email:useremail }).limit(5).sort({ createdAt: -1 });
        // if (!res || res.length === 0) {
        //     return NextResponse.json({ message: "No URLs found" }, { status: 404 });
        // }
    
        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

    export async function POST(req: Request) {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }
        try {
            await connectDB(); // Ensure the database connection is established
            const useremail = session?.user?.email;
            const {page} = await req.json();
            const res = await url.find({ email:useremail }).limit(5).skip((page - 1) * 5).sort({ createdAt: -1 });
            if (!res || res.length === 0) {
                return NextResponse.json({ message: "No URLs found" }, { status: 404 });
            }
            // console.log(res);
            
        
            return NextResponse.json(res);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        }
    }



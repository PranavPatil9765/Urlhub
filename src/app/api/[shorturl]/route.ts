import { connectDB } from "@/libs/db";
import Url from "@/libs/models/url_model";
import { NextResponse } from "next/server";
import ClickLog from "@/libs/models/clicklog_model"; // ✅ Import ClickLog model
import mongoose from "mongoose"; // ✅ Import mongoose for ObjectId type
import { getServerSession } from "next-auth";
export async function GET(req: Request, context: { params: { shorturl: string } }) {
    try {
        await connectDB(); // ✅ Ensure MongoDB connection

        // ✅ Validate and extract `shorturl`
        const shorturl = context.params.shorturl;
        if (!shorturl || typeof shorturl !== "string") {
            return NextResponse.json({ message: "Invalid Short URL" }, { status: 400 });
        }
        console.log(shorturl)

        const userIP = req.headers.get("x-forwarded-for") || req.headers.get("remote-address");
        const userAgent = req.headers.get("user-agent");
        const referrer = req.headers.get("referer");
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const email = session?.user?.email;
        // ✅ Log click data
        const clickLog = new ClickLog({
            email,
            shortUrl: shorturl,
            ip: userIP,
            userAgent: userAgent,
            referrer: referrer,
        });
        await clickLog.save();

        // ✅ Find corresponding original URL
        const urlData = await Url.findOne({ shortUrl: shorturl });
        

        if (!urlData) {
            return NextResponse.json({ message: "URL not found" }, { status: 404 });
        }
        const update = { $inc: { clicks: 1 } };
        await Url.updateOne({ shortUrl: context.params.shorturl }, update);

        // ✅ Check if the original URL is valid



        // ✅ Redirect to the original URL
        return NextResponse.redirect(urlData.originalUrl);
    } catch (error) {
        console.error("Error redirecting:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
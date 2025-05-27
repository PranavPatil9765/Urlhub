import { connectDB } from "@/libs/db";
import Url from "@/libs/models/url_model";
import ClickLog from "@/libs/models/clicklog_model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const shorturl = url.pathname.split("/").pop(); // Extract "shorturl" from URL

    if (!shorturl || typeof shorturl !== "string") {
      return NextResponse.json({ message: "Invalid Short URL" }, { status: 400 });
    }

    const userIP = req.headers.get("x-forwarded-for") || req.headers.get("remote-address");
    const userAgent = req.headers.get("user-agent");
    const referrer = req.headers.get("referer");

    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const email = session?.user?.email;

    const clickLog = new ClickLog({
      email,
      shortUrl: shorturl,
      ip: userIP,
      userAgent,
      referrer,
    });
    await clickLog.save();

    const urlData = await Url.findOne({ shortUrl: shorturl });

    if (!urlData) {
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    await Url.updateOne({ shortUrl: shorturl }, { $inc: { clicks: 1 } });

    return NextResponse.redirect(urlData.originalUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

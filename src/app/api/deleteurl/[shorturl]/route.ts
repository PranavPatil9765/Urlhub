import { connectDB } from "@/libs/db";
import Url from "@/libs/models/url_model";
import { NextResponse } from "next/server";

// Updated type definition to reflect that params is a Promise
export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ shorturl: string }> }
) {
  try {
    await connectDB();

    const { shorturl } = await params; // Now TypeScript knows params is a Promise

    const deletedUrl = await Url.findOneAndDelete({ shortUrl: shorturl });

    if (!deletedUrl) {
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "URL deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting URL:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
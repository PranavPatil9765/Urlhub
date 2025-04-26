import { connectDB } from "@/libs/db";
import Url from "@/libs/models/url_model";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: { params: { shorturl: string } }) {
    try {
        await connectDB(); // Ensure MongoDB connection

        // ✅ Await `context.params` properly
        const { shorturl } = context.params; 

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
import { NextResponse } from "next/server";
import { connectDB } from "@/libs/db";
import ClickLog from "@/libs/models/clicklog_model";
import { getServerSession } from "next-auth";

export async function GET() {
  await connectDB();
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ message: "Email not found" }, { status: 400 });
  }

  // ✅ Group clicks by date so the graph is correct
  const clickData = await ClickLog.aggregate([
    { $match: { email } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$clickedAt" } }, // Group by date only
        count: { $sum: 1 }, // Count clicks for each date
      },
    },
    { $sort: { _id: 1 } }, // Sort by date
  ]);

  if (!clickData.length) {
    console.error("No click data found for the user:", email);
    return NextResponse.json({ message: "No click data found" }, { status: 404 });
  }

  // ✅ Extract correct labels and click counts
  const labels = clickData.map((entry) => entry._id); // Dates
  const clicks = clickData.map((entry) => entry.count); // Count per date

  // ✅ User Agent Distribution
  const userAgents = await ClickLog.aggregate([
    { $group: { _id: "$userAgent", count: { $sum: 1 } } },
  ]);

  const userAgentDistribution = userAgents.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});


  return NextResponse.json({ labels, clicks, userAgents: userAgentDistribution });
}
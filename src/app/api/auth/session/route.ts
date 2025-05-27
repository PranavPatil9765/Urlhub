import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../libs/authOptions"; // Adjust path if needed
import { log } from "console";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ user: session.user });
}
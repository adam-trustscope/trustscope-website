import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL || "https://api.trustscope.ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/api/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { success: true, message: "You're on the list!", count: 0 },
      { status: 200 }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/v1/waitlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Waitlist count error:", error);
    return NextResponse.json({ count: 0, partnerCount: 0 });
  }
}

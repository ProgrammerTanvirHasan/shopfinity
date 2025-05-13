import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new NextResponse(
      JSON.stringify({ message: "Missing search query" }),
      { status: 400 }
    );
  }

  try {
    const db = await connectDB();
    const collection = db.collection("allPost");

    const results = await collection
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      })
      .toArray();

    return new NextResponse(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Search failed due to a server error" }),
      { status: 500 }
    );
  }
}

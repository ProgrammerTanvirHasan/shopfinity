import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectDB();
    const users = await db.collection("cart").find().toArray();

    return new NextResponse(JSON.stringify({ users }), {
      status: 200,
    });
  } catch (error) {
    console.error("Cart GET error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching cart items" }),
      {
        status: 500,
      }
    );
  }
}

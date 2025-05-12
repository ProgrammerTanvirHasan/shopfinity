import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const post = await request.json();
  try {
    const db = await connectDB();
    const emailCollection = db.collection("email");
    const resp = await emailCollection.insertOne(post);
    return NextResponse.json({ message: "Email sent successfully" }, resp);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong bro" },
      { status: 504 }
    );
  }
};

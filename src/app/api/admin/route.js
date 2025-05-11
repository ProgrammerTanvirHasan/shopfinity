import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const post = await request.json();
  console.log("Received data:", post);
  try {
    const db = await connectDB();
    const postCollection = db.collection("allPost");
    const resp = await postCollection.insertOne(post);
    return NextResponse.json({ message: "post pubish successfully" }, resp);
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong bro" },
      { status: 504 }
    );
  }
};




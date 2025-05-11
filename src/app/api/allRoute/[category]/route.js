import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { pathname } = new URL(req.url);
  const category = pathname.split("/").pop();

  try {
    const db = await connectDB();
    const postCollection = db.collection("allPost");

    const posts = await postCollection.find({ category }).toArray();

    return NextResponse.json({
      products: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching posts" },
      { status: 500 }
    );
  }
};

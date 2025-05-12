import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12;
  const skip = (page - 1) * limit;

  try {
    const db = await connectDB();
    const postCollection = db.collection("allPost");

    const total = await postCollection.countDocuments();

    const posts = await postCollection
      .find()
      .sort({ _id: -1 }) // newest products first
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      products: posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong while fetching posts" },
      { status: 500 }
    );
  }
};

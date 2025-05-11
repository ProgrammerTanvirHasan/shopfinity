import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const postCollection = db.collection("allPost");
  try {
    const resp = await postCollection.deleteOne({
      _id: new ObjectId(params.id),
    });
    return NextResponse.json(resp, { message: "product deleted" });
  } catch (error) {
    return NextResponse.json(error, { message: "something went wrong" });
  }
};

export const GET = async (request, { params }) => {
  try {
    const { id } = await params;
    const db = await connectDB();

    const postCollection = db.collection("allPost");

    const resp = await postCollection.findOne({
      _id: new ObjectId(String(id)),
    });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 504 }
    );
  }
};

export const POST = async (request, { params }) => {
  const db = await connectDB();
  const postCollection = db.collection("allPost");

  try {
    const body = await request.json();
    const { title, category, postImage, amount } = body;

    const updateDoc = {
      $set: {
        title,
        category,
        postImage,
        amount: parseFloat(amount),
      },
    };

    const result = await postCollection.updateOne(
      { _id: new ObjectId(params.id) },
      updateDoc
    );

    return NextResponse.json(
      { message: "Product updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Failed to update product", error: error.message },
      { status: 500 }
    );
  }
};

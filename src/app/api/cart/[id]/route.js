import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    const { userEmail } = await req.json();

    if (!id || !userEmail) {
      return new NextResponse(
        JSON.stringify({ message: "Missing id or email" }),
        { status: 400 }
      );
    }

    const db = await connectDB();
    const result = await db.collection("cart").deleteOne({
      _id: new ObjectId(id),
      userEmail: userEmail,
    });

    if (result.deletedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No matching item found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Item deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error deleting item" }),
      { status: 500 }
    );
  }
}

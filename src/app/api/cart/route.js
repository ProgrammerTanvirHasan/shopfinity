import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { productId, title, amount, userEmail } = await req.json();
    const db = await connectDB();

    const result = await db.collection("cart").insertOne({
      userEmail,
      productId,
      title,
      amount,
    });

    return new NextResponse(
      JSON.stringify({ message: "Added to cart", result }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Cart POST error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error adding to cart" }),
      {
        status: 500,
      }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new NextResponse(
        JSON.stringify({ message: "Email is required" }),
        {
          status: 400,
        }
      );
    }

    const db = await connectDB();
    const users = await db
      .collection("cart")
      .find({ userEmail: email })
      .toArray();

    if (users.length === 0) {
      return new NextResponse(JSON.stringify({ message: "No users found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ users }), {
      status: 200,
    });
  } catch (error) {
    console.error("User GET error:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching users" }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json(
        { message: "Missing userEmail" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const result = await db.collection("cart").deleteMany({ userEmail });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "No items found for this email" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Items deleted", deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cart items:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

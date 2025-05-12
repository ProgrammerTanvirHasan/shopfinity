import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
  try {
    const user = await request.json();

    const { name, email, password } = user;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const userCollection = db.collection("users");

    const exist = await userCollection.findOne({ email });
    if (exist) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    await userCollection.insertOne({
      name,
      email,

      password,
      role: "User",
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};

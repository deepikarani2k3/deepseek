import connectDB from "@/config/db";
import Chat from "@/models/chatModel"; // make sure this exists
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }

    const { chatId, name } = await request.json();

    // connect to the database
    await connectDB();

     await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { name }
    );
    return NextResponse.json({
      success: true,
      message: "Chat renamed successfully",
      chat: updatedChat,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

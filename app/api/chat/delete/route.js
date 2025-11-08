import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { userId } = getAuth(request);
    const {chatId} = await request.json();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" });
    }       

    // connect to the database
    await connectDB();
    await Chat.deleteOne({ _id: chatId, userId });
    return NextResponse.json({ success: true, message: "Chat deleted successfully" });
   
    } catch (error) {   
    return NextResponse.json(
      { success: false, error: error.message }
    );
  }
}
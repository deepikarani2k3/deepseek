import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request); 
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" ,} )
    } 
    
    //prepare the chat data to be saved in the database
    const chatData = {
     userId,
      messages: [],
      name: "New Chat", 
    }; 

    // connect to the database and create a new chat
    await connectDB();
    await Chat.create(chatData);
    return NextResponse.json({ success: true, message: "Chat created successfully" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create chat" });
  }}
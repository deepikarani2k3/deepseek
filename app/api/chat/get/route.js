import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" }
            );
        }               
        // connect to the database and fetch chats for the authenticated user
        await connectDB();
        const data = await Chat.find({ userId });
        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message }
        );
    }}
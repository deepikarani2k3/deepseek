import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req) {      
     const wh = new Webhook(process.env.SIGNING_SECRET);
     const headerPayLoad = await headers();
     const svixHeaders = {
        "svix-id": headerPayLoad.get("svix-id"),
        "svix-timestamp": headerPayLoad.get("svix-timestamp"),
        "svix-signature": headerPayLoad.get("svix-signature"),
     }
     //Get the payload and verify it

     const payload = await req.json();
     const body=JSON.stringify(payload);
     const {data, type}= wh.verify(body,svixHeaders);

      //prepare the user data to be stored in the database
      const userData={
        _id:data.id,
        email:data.email_addresses[0].email_address,
        name:`${data.first_name } $ {data.last_name}`,
        image:data.image_image_url,
      };

      await connectDB();

      switch(type){
        case "user.created":
         await User.create(userData);
        //  console.log("User created and stored in DB");
         break;
        case "user.updated":
         await User.findByIdAndUpdate(data.id,userData);
        //  console.log("User updated in DB");
         break;
         case "user.deleted":
         await User.findByIdAndDelete(data.id);
        //  console.log("User deleted from DB");
         break;
         default:
          console.log("Unhandled event type:",type);
          break;
      }
      return NextRequest.json({message:"Webhook received successfully"});
    }
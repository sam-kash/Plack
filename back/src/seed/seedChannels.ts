import mongoose from "mongoose"
import Channel from "../models/Channel"
import dotenv from "dotenv"

dotenv.config();

async function seedChannels(){
    try{
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Mongo connected");

        const channels = [
            {name : "general"},
            {name : "random"},
            {name : "project-discussion"}
        ];

        await Channel.deleteMany({})
        console.log("old channels removed")

        await Channel.insertMany(channels)
        console.log("Dummy channels seeded")
        //process.exit(1);

        process.exit();
        
    }catch(err){
        console.error("Seeding error", err);
        process.exit(1);
    }
}

seedChannels()
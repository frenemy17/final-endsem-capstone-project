import mongoose from "mongoose";
import User from "./src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

const updateAvatars = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const users = await User.find({});
    
    for (const user of users) {
      const randomSeed = Math.random().toString(36).substring(7);
      const newAvatar = `https://api.multiavatar.com/${randomSeed}.svg`;
      
      await User.findByIdAndUpdate(user._id, { profilePic: newAvatar });
      console.log(`Updated avatar for ${user.fullName}`);
    }
    
    console.log("All avatars updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating avatars:", error);
    process.exit(1);
  }
};

updateAvatars();
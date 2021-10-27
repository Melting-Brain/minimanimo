import dotenv from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
import connectDB from "./config/db.js";
import posts from "./data/posts.js";
import users from "./data/users.js";
import Post from "./models/post.js";
import User from "./models/user.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);

    const adminUser = createUsers[0]._id;

    const samplePosts = posts.map((post) => {
      return { ...post, user: adminUser };
    });

    await Post.insertMany(samplePosts);
    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

// use it at the beginning of getting some initial data
// watch out for duplicate data

const dotenv = require('dotenv')
const colors = require('colors')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const posts = require('./data/posts')
const users = require('./data/users')
const Post = require('./models/post')
const User = require('./models/user')

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

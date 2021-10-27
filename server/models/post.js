import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    user: {
      // 어느 유저의 글인지 연결
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

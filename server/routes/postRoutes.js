// import express from 'express';
// import {
//   getPosts,
//   addPost,
//   updateMyPost,
//   deleteMyPost,
//   getMyPosts,
// } from '../controllers/postController.js';
// import { protect } from '../middleware/auth.js'; // for private routes

const express = require("express");
const {
  getPosts,
  addPost,
  updateMyPost,
  deleteMyPost,
  getMyPosts,
} = require("../controllers/postController")
const { protect } = require("../middleware/auth")

const router = express.Router();

// endpoint => /api/posts
router.route('/').get(getPosts);
router.route('/new').post(protect, addPost);
router.route('/edit').put(protect, updateMyPost);
router.route('/delete').delete(protect, deleteMyPost);

router.route('/mine').get(protect, getMyPosts); // 마이페이지 용

// export default router;
module.exports = router; 
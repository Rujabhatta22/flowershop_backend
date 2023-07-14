const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const upload=require('../middleware/upload')

//CREATE POST
router.post("/", upload.single('photo'), (req,res,next) => {
  console.log(req.body)
  let newPost = {
    username: req.body.username,
    title: req.body.title,
    desc: req.body.desc
  }
  const file = req.file;
  if (file) {
    const filename = req.file.filename;
    newPost.photo = '/images/postimages/' + filename;
  }
  Post.create(newPost).then(
    post=> {
      res.status(201).json({
        data:post
      })
    }
  ).catch(next)
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {  
  try {
    const post = await Post.findByIdAndDelete(req.params.id); 
    res.status(200);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

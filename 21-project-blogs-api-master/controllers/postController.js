const postService = require('../services/postService');
// const { Category } = require('../models');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const post = await postService.createPost(title, content, categoryIds);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    if (!post) {
      res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;
    const post = await postService.updatePost(id, title, content, categoryIds);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.deletePost(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

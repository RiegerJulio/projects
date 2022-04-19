const postService = require('../services/postService');

const createPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const post = await postService.createPost(title, content, categoryIds, id);
    res.status(201).json(post);
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
    }
    if (!categoryIds) {
      res.status(400).json({ error: 'Category is required' });
    }
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

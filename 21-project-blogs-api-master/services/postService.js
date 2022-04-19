const { BlogPost, Category, User } = require('../models');

const createPost = async (title, content, categoryIds, userId) => {
  const checkCategoryId = await Category.findAll({
    where: { id: categoryIds },
  });
  if (checkCategoryId.length !== categoryIds.length) {
    return { error: 'Category not exists' };
  }
  if (!title || !content) {
    return { error: 'Title and content are required' };
  }
  const post = await BlogPost.create({ title, content, userId });
  return post;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  return post;
};

const updatePost = async (id, title, content, categoryId) => {
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
  if (!id) {
    return { error: 'Post not exists' };
  }
  if (!title || !content) {
    return { error: 'Title and content are required' };
  }
  if (categoryId) {
    return { error: 'Category cant be edited' };
  }
  const postUpdated = await getPostById(id);
  return postUpdated;
};

const deletePost = async (id) => {
  const post = await BlogPost.destroy({
    where: { id },
  });
  if (!id) {
    return { error: 'Post not exists' };
  }
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
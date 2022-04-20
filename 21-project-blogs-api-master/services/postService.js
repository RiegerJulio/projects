const { BlogPost, Category, User } = require('../models');

const createPost = async (title, content, userId) => {
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

const updatePost = async ({ title, content }, userId, id) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return { message: 'Post does not exist' };
  }
  if (userId !== post.dataValues.userId) {
    return { message: 'Unauthorized user' };
  }
  await BlogPost.update(
    { title, content },
    { where: { id } },
  );
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
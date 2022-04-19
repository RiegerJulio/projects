const postRoutes = require('express').Router();
const postController = require('../controllers/postController');

postRoutes.post('/', postController.createPost);
postRoutes.get('/', postController.getAllPosts);
postRoutes.get('/:id', postController.getPostById);
postRoutes.put('/:id', postController.updatePost);
postRoutes.delete('/:id', postController.deletePost);

module.exports = postRoutes;
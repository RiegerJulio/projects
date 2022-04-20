const postRoutes = require('express').Router();
const postController = require('../controllers/postController');
const { postValidations,
  tokenValidations, postCategoryValidations } = require('../middlewares/validations');

postRoutes.post('/', tokenValidations, postValidations,
  postCategoryValidations, postController.createPost);
postRoutes.get('/', tokenValidations, postController.getAllPosts);
postRoutes.get('/:id', tokenValidations, postController.getPostById);
postRoutes.put('/:id', postController.updatePost);
postRoutes.delete('/:id', postController.deletePost);

module.exports = postRoutes;

const postRoutes = require('express').Router();
const postController = require('../controllers/postController');
const { postValidations, editValidations,
  tokenValidations, postCategoryValidations } = require('../middlewares/validations');

postRoutes.post('/', tokenValidations, postValidations,
  postCategoryValidations, postController.createPost);
postRoutes.get('/', tokenValidations, postController.getAllPosts);
postRoutes.get('/:id', tokenValidations, postController.getPostById);
postRoutes.put('/:id', tokenValidations, editValidations, postController.updatePost);
postRoutes.delete('/:id', tokenValidations, postController.deletePost);

module.exports = postRoutes;

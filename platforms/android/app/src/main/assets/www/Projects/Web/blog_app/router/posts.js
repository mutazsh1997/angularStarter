const expressApp = require('express');

const postsController = require('../controllers/posts');

const chekAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/multer');

const router = expressApp.Router();

router.post(""
    , chekAuth
    , extractFile
    , postsController.createPost);

router.get("", postsController.getAllPosts);


router.get("/:id", postsController.getPostById);

router.put("/:id"
    , chekAuth
    , extractFile,
    postsController.updatePost
);

router.delete("/:id"
    , chekAuth
    , postsController.deletePost);

module.exports = router;
const expressAuth = require('express');
const userController = require('../controllers/user');

const router = expressAuth.Router();

router.post('/singup', userController.createUser);

router.post("/login", userController.login);

module.exports = router;
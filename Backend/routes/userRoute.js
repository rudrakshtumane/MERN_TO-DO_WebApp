const  express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorize = require('../middlewares/authorize')


// user
router.post('/registerUser', userController.registerUser);

router.post('/loginUser', userController.loginUser);

// router.get('/getUserInfo',authorize.auth, userController.getUserInfo)

module.exports = router;
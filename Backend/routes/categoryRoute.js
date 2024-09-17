const express = require('express');
const { createCategory } = require('../controllers/categoryController');
const auth = require('../middlewares/authorize');

const router = express.Router();
router.post('/createCategory', auth, createCategory);

module.exports = router;

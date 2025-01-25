const express = require('express');
const router = express.Router();

const usersController = require('../controllers/comments');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createComment);

router.put('/:id', usersController.updateComment);

router.delete('/:id', usersController.deleteComment);

module.exports = router;
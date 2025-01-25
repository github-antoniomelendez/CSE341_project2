const express = require('express');
const router = express.Router();
const {commentsValidationRules, validate} = require('./validator');

const usersController = require('../controllers/comments');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', commentsValidationRules(), validate, usersController.createComment);

router.put('/:id', commentsValidationRules(), validate, usersController.updateComment);

router.delete('/:id', usersController.deleteComment);

module.exports = router;
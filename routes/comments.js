const express = require('express');
const router = express.Router();
const {commentsValidationRules, validate} = require('./validator');

const usersController = require('../controllers/comments');

const { isAuthenticated } = require('./authenticate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', commentsValidationRules(), validate, isAuthenticated, usersController.createComment);

router.put('/:id', commentsValidationRules(), validate, isAuthenticated, usersController.updateComment);

router.delete('/:id', isAuthenticated, usersController.deleteComment);

module.exports = router;
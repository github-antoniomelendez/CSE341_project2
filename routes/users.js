const express = require('express');
const router = express.Router();
const {usersValidationRules, validate} = require('./validator');

const usersController = require('../controllers/users');

const { isAuthenticated } = require('./authenticate');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersValidationRules(), validate, isAuthenticated, usersController.createUser);

router.put('/:id', usersValidationRules(), validate, isAuthenticated, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const {usersValidationRules, validate} = require('./validator');

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersValidationRules(), validate, usersController.createUser);

router.put('/:id', usersValidationRules(), validate, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
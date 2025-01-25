const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }); 
};

const getSingle = async (req, res, next) => {
    if (!(req.params.id && req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters.'));
        return;
    }
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
        result.toArray().then((users) => {
            if (users === null || users.length === 0) {
                next(createError(404, 'This user id does not exist.'));
                return;
            }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
    } catch (error) {
        next(createError(500, 'Server is unable to fulfill request.'));
    }
};

const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        phone: req.body.phone,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the user.');
    }
};

const updateUser = async (req, res, next) => {
    if (!(req.params.id && req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters.'));
        return;
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        phone: req.body.phone,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(201).json({
            'Message' : 'The user has been successfully updated!', 
            'Updated User' : user
        });
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the user. Please check id.');
    }
};

const deleteUser = async (req, res, next) => {
    if (!(req.params.id && req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters.'));
        return;
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
        res.status(201).json({
            'Message' : 'The user has been successfully deleted!'
        });
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the user. Please check id.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser, 
    updateUser,
    deleteUser
};
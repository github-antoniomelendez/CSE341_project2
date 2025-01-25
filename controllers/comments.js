const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('comments').find();
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
        const result = await mongodb.getDatabase().db().collection('comments').find({ _id: userId });
        result.toArray().then((users) => {
            if (users === null || users.length === 0) {
                next(createError(404, 'This comment id does not exist.'));
                return;
            }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
    } catch (error) {
        next(createError(500, 'Server is unable to fulfill request.'));
    }
};

const createComment = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        date: req.body.date,
        comment: req.body.comment
    };
    const response = await mongodb.getDatabase().db().collection('comments').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the comment.');
    }
};

const updateComment = async (req, res, next) => {
    if (!(req.params.id && req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters.'));
        return;
    }
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        date: req.body.date,
        comment: req.body.comment
    };
    const response = await mongodb.getDatabase().db().collection('comments').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(201).json({
            'Message' : 'The comment has been successfully updated!', 
            'Updated User' : user
        });
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the comment. Please check id.');
    }
};

const deleteComment = async (req, res, next) => {
    if (!(req.params.id && req.params.id.length === 24)) {
        next(createError(400, 'A valid id must have 24 characters.'));
        return;
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('comments').deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
        res.status(201).json({
            'Message' : 'The comment has been successfully deleted!'
        });
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the comment. Please check id.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createComment,
    updateComment,
    deleteComment
};
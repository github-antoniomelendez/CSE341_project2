const router = require('express').Router();

router.get('/', (req, res) => {res.send('Hello World')});

router.use('/users', require('./users'));
router.use('/comments', require('./comments'));

module.exports = router;
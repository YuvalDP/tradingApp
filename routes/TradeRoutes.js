var express = require('express');
var router = express.Router();
const {  check, validationResult } = require('express-validator/check');
const db = require('../Database/connection');

router.get('/fetchTrades/:id',[
    check('id').exists().withMessage('Id params required'),
    check('id').isInt().withMessage('Id params must be number')
], (req, res) => {
    if(req.user) {
        console.log('req.param', req.params);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
            return res.status(422).json(err);
        }
        res.send(req.params);
    } else {
        res.status(422).json({ message: 'Unauthorized' });
    }
});

module.exports = router;
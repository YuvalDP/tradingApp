var express = require('express');
const {  check, validationResult } = require('express-validator/check');
var router = express.Router();
const db = require('../Database/connection');
const { login } = require('../Database/queries');

router.post('/login', [
    check('email').exists().withMessage('email Required'),
    check('password').exists().withMessage('password required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
        return res.status(422).json(err);
    }
    const { email, password } = req.body;
    db.query(login, [email, password], (err, results, fields) => {
        if(err) {
            res.status(501).json({ message: 'Internal server error', err });
        } else if(results.length === 1) {
            res.send(results);
        } else {
            res.status(422).json({ message: 'Invalid credentials.' });
        }
    })
});

module.exports = router;
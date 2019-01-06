var express = require('express');
const {  check, validationResult } = require('express-validator/check');
var router = express.Router();
const db = require('../Database/connection');
const { signup, checkifExists } = require('../Database/queries');

router.post('/signup',[
    check('username').exists().withMessage('username Required'),
    check('firstname').exists().withMessage('firstname Required'),
    check('lastname').exists().withMessage('lastname Required'),
    check('email').exists().withMessage('email Required'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').exists().withMessage('password Required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
        return res.status(422).json(err);
    }
    const { username, firstname, lastname, email, password } = req.body;
    db.query(checkifExists, [email], (err, results, fields) => {
        if(err){
            res.status(501).json({ message: 'Internal server error', err });
        } else if(results.length > 0) {
            res.send({ message: 'User with email already exists.' })
        } else {
            db.query(signup, [username, firstname, lastname, email, password], (err, reslt, fields) => {
                if(err) {
                    if(err.sqlMessage.includes('Duplicate entry')) {
                        res.status(401).json({ message: 'Username already exists' });
                    }else {
                        res.status(501).json({ message: 'Internal server error', err });
                    }
                } else {
                    res.send(reslt);
                }
            });
        }
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
const {  check, validationResult } = require('express-validator/check');
const db = require('../Database/connection');
const { signup, checkifExists, login, updateCredential } = require('../Database/queries');

/* GET users listing. */

router.put('/updateCredential', [
    check('email').withMessage('Email Required'),
    check('password').withMessage('password Required'),
    check('newPassword').withMessage('newPassword Required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
        return res.status(422).json(err);
    }
    const { email, password, newPassword } = req.body;
    db.query(login, [email, password], (err, results, fields) => {
        if(err) {
          res.status(501).json({ message: 'Internal server error', err });
        } else if(results.length === 1) {
          db.query(updateCredential, [newPassword, email], (err, reslt, fields) => {
            if(err) {
              res.status(501).json({ message: 'Internal server error', err });
            } else {
              res.send(reslt);
            }
          })
        } else {
          res.status(401).json({ message: 'Invalid current credentials.' })
        }
    });
});

module.exports = router;

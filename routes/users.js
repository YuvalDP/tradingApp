var express = require('express');
var router = express.Router();
const {  check, validationResult } = require('express-validator/check');
const db = require('../Database/connection');
const { signup, checkifExists, login, updateCredential } = require('../Database/queries');

/* GET users listing. */

router.put('/updateCredential', [
    check('apiKey').exists().withMessage('apikey Required'),
    check('secretKey').exists().withMessage('secretKey Required'),
    check('userid').exists().withMessage('userid Required'),
    check('userid').isInt().withMessage('Bad requests.'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
        return res.status(422).json(err);
    }
    const { userid, apiKey, secretKey } = req.body;
          db.query(updateCredential, [apiKey, secretKey, userid], (err, reslt, fields) => {
            if(err) {
              res.status(501).json({ message: 'Internal server error', err });
            } else {
              res.send(reslt);
            }
          })
});

module.exports = router;

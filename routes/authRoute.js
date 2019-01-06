var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
    res.send({ name: '/auth/route' })
});

module.exports = router;
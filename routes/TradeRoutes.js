var express = require('express');
var router = express.Router();
const {  check, validationResult } = require('express-validator/check');
const db = require('../Database/connection');
const { fetchTradeHistory,
    fetchTradeByUser,
    checkTradeExists,
    updateTradeRisks,
    createTradeRisks,
    getAllSymbols,
    updateTrade
} = require('../Database/queries');

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
        const { id } = req.params;
        db.query(fetchTradeByUser, [id], (err, results, fields) => {
           if(err) {
               res.status(501).json({ message: 'Internal server error', err });
           } else {
               res.send(results);
           }
        });
    } else {
        res.status(422).json({ message: 'Unauthorized' });
    }
});

router.get('/fetchPortfolio/:id', [
    check('id').exists().withMessage('Id params required'),
    check('id').isInt().withMessage('Id params must be number')
], (req, res) => {
   if(req.user){
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
           return res.status(422).json(err);
       }
       const { id } = req.params;
       db.query(fetchTradeHistory, [id], (err, results, fields) => {
           if(err) {
               res.status(501).json({ message: 'Internal server error', err });
           } else {
               res.send(results);
           }
       });
   } else {
       res.status(422).json({ message: 'Unauthorized' });
   }
});

router.put('/saveTrades', [
    check('userid').exists().withMessage('userid required'),
    check('userid').isInt().withMessage('Invalid userid'),
    check('symbol').exists().withMessage('symbol required'),
    check('max_risks').isInt().withMessage('max_risks required'),
], (req, res) => {
    if(req.user) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
            return res.status(422).json(err);
        }
        const { userid, symbol, max_risks } = req.body;
        db.query(checkTradeExists, [userid, symbol], (err, results, fields) => {
            if(err) {
                res.status(501).json({ message: 'Internal server error', err });
            } else if(results.length === 1) {
                db.query(updateTradeRisks, [max_risks, userid], (err, results, fields) => {
                    if(err) {
                        res.status(501).json({ message: 'Internal server error', trace: 'In update trade risks', err })
                    } else {
                        res.send({ message: 'updated.', ...results })
                    }
                })
            } else if (results.length === 0) {
                db.query(createTradeRisks, [symbol, max_risks, userid], (err, results, fields) => {
                   if(err) {
                       res.status(501).json({ message: 'Internal server error', trace: 'In create trade risks', err })
                   } else {
                       res.send({ message: 'created', ...results });
                   }
                });
            } else {
                res.status(501).json({ message: 'Something wrong!' });
            }
        });
    } else {
        res.status(422).json({ message: 'Unauthorized' });
    }
});

router.get('/fetchSymbols', (req, res) => {
    if(req.user) {
        db.query(getAllSymbols, [], (err, results, fields) => {
            if(err) {
                res.status(501).json({ message: 'Internal server error' });
            } else {
                const arr = results.map(s => s.symbol);
                res.send(arr);
            }
        })
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

router.put('/updateTrade', [
    check('status').exists().withMessage('status required.'),
    check('contractid').exists().withMessage('tradeID required.'),
    check('contractid').isInt().withMessage('tradeID required.')
], (req, res) => {
    if(req.user) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err = errors.array().map(err => ({ field: err.param, message: err.msg }));
            return res.status(422).json(err);
        }
        const { status, contractid } = req.body;
        db.query(updateTrade, [status, contractid], (err, results, fields) => {
            if(err) {
                res.status(501).json({ message: 'Internal server error' });
            } else {
                res.send(results);
            }
        })
    }else {
        res.status(401).json({ message: 'Unauthorized' })
    }
})

module.exports = router;
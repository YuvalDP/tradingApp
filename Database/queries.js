exports.login = 'SELECT * FROM user where email = ? and password = ?';

exports.signup = 'insert into user (username, firstname, lastname, email, password) values (?, ?, ?, ?, ?)';

exports.checkifExists = 'SELECT * FROM user where email = ?';

exports.updateCredential = 'UPDATE user set password = ? where email = ?';

exports.fetchTradeByUser = 'select t.*, c.symbol from trades t left join contract c on t.contractid = c.id where userid = ?';

exports.fetchTradeHistory = `
SELECT 
    t.status,
    t.contractid,
    symbol,
    sum(t.quantity) as quantity,
    sum(t.price * t.quantity) / sum(t.quantity) as boughtAt,
    c.symbol
FROM
    trades t
        LEFT JOIN
    contract c ON t.contractid = c.id
    INNER JOIN
    user u on u.id = t.userid
WHERE
    status = 'open' and u.id = ? group by symbol`;

exports.checkTradeExists = 'select * from trademanagement where userid = ? and symbol = ?';

exports.updateTradeRisks = 'update trademanagement set max_risks = ? where id = ? ';

exports.createTradeRisks = 'insert into trademanagement (symbol, max_risks, userid) values (?, ?, ?)';

exports.getAllSymbols = 'SELECT distinct symbol FROM mydb.contract';

exports.updateTrade = 'UPDATE trades set status = ? where contractid = ?';
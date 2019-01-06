exports.login = 'SELECT * FROM user where email = ? and password = ?';

exports.signup = 'insert into user (username, firstname, lastname, email, password) values (?, ?, ?, ?, ?)';

exports.checkifExists = 'SELECT * FROM user where email = ?';

exports.updateCredential = 'UPDATE user set password = ? where email = ?';

exports.fetchTradeByUser = 'select t.*, c.symbol from trades t left join contract c on t.contractid = c.id where userid = ?';

exports.fetchTradeHistory = `
SELECT 
    t.status,
    t.price,
    t.quantity,
    c.basecurrency,
    c.symbol,
    c.currency,
    c.symbol,
    sum(t.quantity * t.price) as cost,
    (t.price - sum(t.quantity * t.price)) * t.quantity as PNL
FROM
    trades t
        LEFT JOIN
    contract c ON t.contractid = c.id
WHERE
    status = 'open'`;

exports.checkTradeExists = 'select * from trademanagement where userid = ? and symbol = ?';

exports.updateTradeRisks = 'update trademanagement set max_risks = ? where id = ? ';

exports.createTradeRisks = 'insert into trademanagement (symbol, max_risks, userid) values (?, ?, ?)';
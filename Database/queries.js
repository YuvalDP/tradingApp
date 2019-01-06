exports.login = 'SELECT * FROM user where email = ? and password = ?';

exports.signup = 'insert into user (username, firstname, lastname, email, password) values (?, ?, ?, ?, ?)';

exports.checkifExists = 'SELECT * FROM user where email = ?';

exports.updateCredential = 'UPDATE user set password = ? where email = ?';

exports.fetchTradeByUser = 'select * from trade where userid = ?';
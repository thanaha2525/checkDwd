const db = require("../../db/connect");
var md5 = require("md5");

const getLogin = (req, res, next) => {
  res.send({
    page: "login"
  });
};

const postLogin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  var hash = md5(password);
  const user = `select * from staff where username = '${username}' and password ='${hash}'`;
  db().query(user, (err, rs) => {
    if (err) throw err;
    if (rs.length > 0) {
      req.session.loggedin = true;
      const users = (req.session.username = username);

      res.send({ page: "staff page", user: users });
      res.end();
    } else {
      req.session.loggedin = false;
      req.session.username = "";
      res.send({ page: "login" });
      res.end();
    }
  });
};

const logout = (req, res, next) => {
  req.session.loggedin = false;
  req.session.username = "";
  res.send({ page: "login" });
};

module.exports = getLogin;
module.exports.postLogin = postLogin;
module.exports.logout = logout;

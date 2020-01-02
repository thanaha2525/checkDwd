const db = require("../../db/connect");

const index = (req, res, next) => {
  res.send({ page: "index" });
};

const home = (req, res, next) => {
  const getData = "SELECT * FROM `check`";

  db().query(getData, (err, result) => {
    res.send({ page: "home", result });
  });
};

const findHome = (req, res, next) => {
  const find = req.body.find;
  const getData = "SELECT * FROM `check` WHERE `name` = " + `'${find}'`;
  db().query(getData, (err, rs) => {
    console.log(rs);
    res.send({ page: "home", rs });
  });
};

module.exports = home;
module.exports.findHome = findHome;
module.exports.index = index;

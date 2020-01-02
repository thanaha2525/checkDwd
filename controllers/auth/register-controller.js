const db = require("../../db/connect");
const md5 = require("md5");

const getRegister = (req, res, next) => {
  res.send({ page: "Register" });
};
const postRegister = (req, res, next) => {
  const name = req.body.name;
  const sername = req.body.sername;
  const perId = req.body.perId;
  const file = req.body.file;
  const username = req.body.username;
  const password = req.body.password;
  const tel = req.body.tel;

  var hash = md5(password);
  const insertData = `INSERT INTO staff(perId, name, surname, file, tel, username, password) VALUES ('${perId}','${name}','${sername}','${file}','${tel}','${username}','${hash}')`;
  console.log(insertData);
  db().query(insertData, (err, rs) => {
    if (rs) {
      res.send({ page: "register", message: "register success" });
    } else {
      res.send({ page: "register", message: "register fail" });
    }
  });
};



module.exports = getRegister;
module.exports.postRegister = postRegister;

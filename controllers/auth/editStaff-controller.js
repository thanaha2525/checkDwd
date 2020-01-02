const db = require("../../db/connect");
var md5 = require("md5");

const getEditStaff = (req, res, next) => {
  res.send({ page: "editStaff" });
};

const putStaff = (req, res, next) => {
  const perId = req.body.perId;
  const getData = `SELECT name,surname,tel,username from staff where perId = ${perId}`;
  console.log(getData);
  db().query(getData, (err, rs) => {
    if (err) throw res.send({ page: "editStaff", status: "cannot edit staff" });
    const editName = req.body.name;
    const editSurname = req.body.surname;
    const tel = req.body.tel;
    const username = req.body.username;

    const putData = `UPDATE staff SET name='${editName}',surname='${editSurname}',tel='${tel}',username='${username}' where perId = '${perId}' `;
    db().query(putData, (err, rs) => {
      if (err)
        throw res.send({ page: "editStaff", status: "cannot edit staff" });
      res.send({ page: "editstaff" });
    });
  });
};

const putAuth = (req, res, next) => {
  const perId = req.body.perId;
  const password = req.body.password;
  const hashPassword = md5(password);
  const updateData = `UPDATE staff SET password='${hashPassword}' where perId = '${perId}'`;
  db().query(updateData, (err, rs) => {
    res.send({ rs });
  });
};

const putFile = (req, res, next) => {};

const delStaff = (req, res, next) => {
  const perId = req.body.perId;
  const delData = `DELETE FROM staff where perId = ${perId}`;

  db().query(delData, (err, rs) => {
    res.send({ rs });
  });
};

module.exports = getEditStaff;
module.exports.putStaff = putStaff;
module.exports.putAuth = putAuth;
module.exports.delStaff = delStaff;

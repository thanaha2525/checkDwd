const db = require("../../db/connect");
const date = require("../../utility/date");

const getCheck = (req, res, next) => {
  const getData = "SELECT * FROM `check` order by id desc";
  db().query(getData, (err, rs) => {
    res.send({ rs });
  });
};

const postCheck = (req, res, next) => {
  const name = req.body.name;
  const payBefore = req.body.payBefore;
  const payDate = req.body.payDate;
  const updateDate = date();
  const price = req.body.price;
  const createdBy = "thanaha";
  const status = req.body.status;

  const insertData =
    "INSERT INTO `check` (`name`,`payBefore`,`payDate`,`updateDate`,`price`,`createdBy`,`status`) VALUES " +
    `('${name}'` +
    "," +
    `'${payBefore}'` +
    "," +
    `'${payDate}'` +
    "," +
    `'${updateDate}'` +
    "," +
    `${price}` +
    "," +
    `'${createdBy}'` +
    "," +
    `'${status}'` +
    ")";

  db().query(insertData, (err, rs) => {
    if (rs) {
      res.send({ rs });
    } else {
      res.send({ err });
    }
  });
};

const putStatusCheck = (req, res, next) => {
  const id = req.body.id;
  const status = req.body.status;
  const data = "UPDATE `check` SET `status`=" + `'${status}' where id = ${id}`;
  db().query(data, (err, rs) => {
    if (err) {
      res.send("cannot update");
    } else {
      const d = `select * from` + " `check` " + `where id = ${id}`;
      db().query(d, (err, result) => {
        const status = result[0].status;
        if (status == "success" || status == "cancel" || status == "reject") {
          const newData = {
            name: result[0].name,
            payDate: result[0].payDate,
            updateDate: result[0].updateDate,
            createdBy: result[0].createdBy,
            file: result[0].file,
            status: result[0].status,
            updateDate: date(),
            nameMessenger: result[0].nameMessenger
          };
          const del = "DELETE FROM `check` WHERE id = " + `'${id}'`;
          const innewdata =
            "INSERT INTO `checkdel`(`name`, `payDate`, `updateDate`,  `delDate`, `createdBy`, `file`, `status`, `nameMessenger`) VALUES(" +
            `'${newData.name}'` +
            "," +
            `'${newData.payDate}'` +
            "," +
            `'${newData.updateDate}'` +
            "," +
            `'1234'` +
            "," +
            `'${newData.createdBy}'` +
            "," +
            `'${newData.file}'` +
            "," +
            `'${newData.status}'` +
            "," +
            `'${newData.nameMessenger}')`;
          db().query(innewdata, (err, rs) => {
            if (!err) {
              db().query(del, (err, rs) => {
                if (!err) {
                  res.send("success");
                }
              });
            }
          });
        }
      });
    }
  });
};

const getdetail = (req, res, next) => {
  const data = "select * from checkdel order by id desc";
  db().query(data, (err, rs) => {
    res.send({ rs });
  });
};

module.exports = getCheck;
module.exports.postCheck = postCheck;
module.exports.putStatusCheck = putStatusCheck;
module.exports.getdetail = getdetail;

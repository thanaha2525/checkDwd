const express = require("express");
const router = express.Router();
const checkController = require("../controllers/check/check-controller");

router.get("/check", checkController);
router.get("/checkdetail", checkController.getdetail);
router.post("/check", checkController.postCheck);
router.post("/updatecheck", checkController.putStatusCheck);

module.exports = router;

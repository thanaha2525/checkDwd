const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home/home-controller");

router.get("/", homeController.index);
router.get("/index", homeController.index);
router.get("/findall", homeController);
router.post("/find", homeController.findHome);

module.exports = router;

const express = require("express");
const router = express.Router();

const loginController = require("../controllers/auth/login-controller");
const registerController = require("../controllers/auth/register-controller");
const editStaffController = require("../controllers/auth/editStaff-controller");

router.get("/login", loginController);
router.post("/login", loginController.postLogin);
router.get("/logout", loginController.logout);
router.get("/register", registerController);
router.post("/register", registerController.postRegister);
router.post("/editStaff", editStaffController.putStaff);
router.post("/editPassword", editStaffController.putAuth);
router.post("/delStaff", editStaffController.delStaff);

module.exports = router;

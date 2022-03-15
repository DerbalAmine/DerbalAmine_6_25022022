const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const userCrtl = require("../controllers/user");

const passLimit = rateLimit({
  windowMs: 2 * 60 * 10000, // 2 minutes temps pour tester l'application
  max: 3, //3 essais max par adresse ip
});

router.post("/signup", userCrtl.signup);
router.post("/login", passLimit, userCrtl.login);

module.exports = router;

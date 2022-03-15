const express = require("express"); //Appelle le framework express
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-conf"); //Appelle multer, qui permet de gérer les images sur les requêtes

const sauceCtrl = require("../controllers/sauce");

router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;

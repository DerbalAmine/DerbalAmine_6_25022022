const multer = require("multer");

const MIME_TYPES = {
  "images/jpg": "jpg",
  "images/jpeg": "jpg",
  "images/png": "jpg",
};

const storage = multer.diskStorage({
  //Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.
  destination: (req, file, callback) => {
    callback(null, "images"); // la fonction destination indique a multer d'enrengister les fichiers dans le dossier images
  },
  filename: (req, file, callback) => {
    // filename indique a multer d'utiliser le nom d'origine et de remplacer les espaces par des underscores
    const name = file.originalname.split("").join("_");
    const extension = MINE_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); // et d'ajouter un timestamps Date.now comme nom de ficher
  },
});

module.exports = multer({ storage: storage }).single("image"); //Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.

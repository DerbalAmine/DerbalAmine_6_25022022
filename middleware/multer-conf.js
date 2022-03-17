const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "jpg",
};

const imageFilter = (req, file, callback) => {
  if (file.mimetype.startswith("image")) { 
    callback(null, true);
  } else {
    callback("please upload only images", false);
  }
};

const storage = multer.diskStorage({
  //Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.
  destination: (req, file, callback) => {
    callback(null, "images"); // la fonction destination indique a multer d'enrengister les fichiers dans le dossier images
  },
  filename: (req, file, callback) => {
    // filename indique a multer d'utiliser le nom d'origine et de remplacer les espaces par des underscores
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension); // et d'ajouter un timestamps Date.now comme nom de ficher
  },
});
//On exporte le middleware multer
module.exports = multer({ storage: storage, fileFilter: imageFilter }).single("image"); //Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.

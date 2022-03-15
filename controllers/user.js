//Appel du package bcrypt servant à hacher le mot de passe de l'utilisateur
const bcrypt = require("bcrypt");

//Appel du modèle user (schema mongoose)
const User = require("../models/user");

//Appel du package jsonwebtoken
const jwt = require("jsonwebtoken");

//Fonction signup permet l'enrengistrement des utilisateurs (utilisée dans routes/user.js)
exports.signup = (req, res, next) => {
  //Fonction hash qui permet de hasher le mots de passe, utilisée 10 fois sur le password
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      //Crée un nouveau user à partir de User
      const user = new User({
        email: req.body.email,
        password: hash, //permet d'enrengister le mdp en hash 'crypter'
      });
      //Le user est enregistré
      user.save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
          })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//La fonction login permet la connection d'un utilsateur  (utilisée dans routes/user.js)
exports.login = (req, res, next) => {
  //fonction findOne utilisée pour vérifier que le user existe dans User
  User.findOne({ email: req.body.email })
    .then((user) => {
      //Si le user n'existe pas, envoie une erreur
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      //Si le user existe, utilise la fonction compare de bcrypt sur le mot de passe entré qui permt de comparer les mdp
      //avec le mot de passe haché sauvegardé
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          //Si le mot de passe ne correspond pas, envoie une erreur
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          //Si le mot de passe correspond, envoie une réponse contenant l'ID utilisateur
          //et un TOKEN de sécurité
          res.status(200).json({
            userId: user._id,
            //La fonction sign de jsonwebtoken va encoder un nouveau token
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

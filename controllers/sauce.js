// importer le modèle sauce
const Sauce = require("../models/sauce");

// Récupération du package file system permettant de gérer ici les téléchargements et modifications d'images
const fs = require("fs");

// Récupération de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

// Récupération d'une seule sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Création de la sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // exrait l'objet json de sauce
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject, // on cree un objet sauceObjet qui regard si req.file existe
    // mainPepper: sauceObject.mainPepper
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce sauvegardé" }))
    .catch((error) => res.status(400).json({ error }));
};

// Modification de la sauce
exports.modifySauce = (req, res, next) => {
  // (?) ternaire
  const sauceObject = req.file // on vérifie si la modification concerne le body ou un nouveau fichier image
    ? {
        //On récupère la chaîne de caractère, que l'on PARSE en objet JSON...
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      } //Si on ne trouve pas de fichier On prend le corps de la requête
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "modifié" }))
    .catch(() => res.status(400).json({ error }));
};

// Suppression de la sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    // findOne trouve une sauce
    const filename = sauce.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      // on utilise la fonction unlink pour supprimer ce fichier
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    });
  });
};

// Création du like et dislike
exports.likeSauce = (req, res, next) => {
  const like = req.body.like;
  if (like === 1) {
    // Option like
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id,
      }
    )
      .then(() => res.status(200).json({ message: " like !" }))

      .catch((error) => res.status(400).json({ error }));
  } else if (like === -1) {
    // Option dislike
    Sauce.updateOne(
      { _id: req.params.id },
      {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id,
      }
    )
      .then(() => res.status(200).json({ message: "Dislike !" }))
      .catch((error) => res.status(400).json({ error }));
  } else {
    // Annuler like ou dislike
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce.usersLiked.indexOf(req.body.userId) !== -1) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id,
            }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "Vous n'aimez plus cette sauce !" })
            )
            .catch((error) => res.status(400).json({ error }));
        } else if (sauce.usersDisliked.indexOf(req.body.userId) !== -1) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id,
            }
          )
            .then(() =>
              res.status(200).json({ message: "Vous aimez cette sauce !" })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

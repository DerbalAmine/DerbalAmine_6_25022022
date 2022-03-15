const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const saucesRoutes = require("./routes/sauce");

const userRoutes = require("./routes/user");

const path = require("path");

//appelle le package helmet
const helmet = require("helmet");

const app = express();

mongoose.connect(
    "mongodb://AmineDerbal:projet6lundi@cluster0-shard-00-00.owdbk.mongodb.net:27017,cluster0-shard-00-01.owdbk.mongodb.net:27017,cluster0-shard-00-02.owdbk.mongodb.net:27017/projet6?ssl=true&replicaSet=atlas-5r2x5f-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))

  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Appel de la fonction "bodyparser" d'express, transformant les requêtes en string
app.use(express.json());

//envoie le package helmet dans l'application, ce qui va corriger beaucoup de failles de sécurité (plus de détails dans UsefulNotes.txt)
app.use(helmet());
//autorise les utilisations de ressources en "cross-origin"
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//Middleware gérant les problèmes de CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
  //Accepte les requêtes depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Middleware qui permet de transformer le corp de la requête en un objet JSON utilisable
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images"))); // Cela indique à Express qu'il faut gérer la ressource images de manière statique

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;

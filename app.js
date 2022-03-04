const express = require("express");

const mongoose = require("mongoose");

const app = express();

const sauce = require("./models/sauce");

mongoose
  .connect(
    "mongodb+srv://Amine:Projet@6@cluster0.owdbk.mongodb.net/Amine?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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

module.exports = app;

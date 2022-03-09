const express = require("express");

const mongoose = require("mongoose");

const app = express();

const sauce = require("./models/sauce");

const saucesRoutes = require("./routes/sauce");

const userRoutes = require("./routes/user");

mongoose.connect("mongodb://AmineDerbal:projet6lundi@cluster0-shard-00-00.owdbk.mongodb.net:27017,cluster0-shard-00-01.owdbk.mongodb.net:27017,cluster0-shard-00-02.owdbk.mongodb.net:27017/projet6?ssl=true&replicaSet=atlas-5r2x5f-shard-0&authSource=admin&retryWrites=true&w=majority",
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

app.use("/api/sauce", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;

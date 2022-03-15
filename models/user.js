const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator"); //package qui valide l'unicite de l'email

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, },
  password: { type: String, required: true, },
});

userSchema.plugin(uniqueValidator); //permet de pas avoir plusieurs utilisateur avec la meme adresse mail

module.exports = mongoose.model("User", userSchema); // exporter le schema sous forme de model

const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: string, require: true, unique: true },
  password: { type: sting, require: true },
});

userSchema.plugin(uniqueValidator); //permet de pas avoir plusieurs utilisateur avec la meme adresse mail

module.exports = mongoose.model("User", userSchema); // exporter le schema sous forme de model

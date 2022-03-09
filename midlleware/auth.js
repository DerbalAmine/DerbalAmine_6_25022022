const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // fonction verify pour decoder notre token si celui-ci n'est pas valid, une erreur sera generee.
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch (error) { // les erreurs generees ici s'afficheront dans le catch 
    res.status(401).json({
      error: new Error("invalid request!"),
    });
  }
};

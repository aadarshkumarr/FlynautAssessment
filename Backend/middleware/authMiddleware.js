const jwt = require("jsonwebtoken");
require("dotenv").config();
const ProtectRoute = async (req, res, next) => {
  const { authorization } = req.headers;
  //console.log(authorization);
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer sgfdh....
    let verification = jwt.verify(token, process.env.JWT_SECRET);
    try {
      if (verification) {
        //console.log(verification);
        req.id = verification.id;
        //console.log(req.id);
        next();
      } else {
        res.status(401).send("Operation not allowed.");
      }
    } catch (err) {
      return res.send(err.message);
    }
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

module.exports = ProtectRoute;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedValue = jwt.verify(token, ENTER_YOUR_SECRET_KEY);
    req.userData = decodedValue;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed!!" });
  }
};
 
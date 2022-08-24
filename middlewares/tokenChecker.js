const jwt = require("jsonwebtoken");
const tokenChecker = (req, res, next) => {
 
if(!req.headers["authorization"]){
 return res.status(403).json({ error: true, message: "No token Provided" })
}
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, "SECRET1234", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: true, message: "Unauthorised" });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({ error: true, message: "No token Provided" });
  }
};

module.exports = tokenChecker;
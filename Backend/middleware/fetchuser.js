const jwt = require("jsonwebtoken");
const JWTSecret = "pavas$@#()bhjrere234";

const fetchuser = (req, res, next) => {
    // get the user from JWT token and add to req body
    const token = req.header("auth-token");
    if (!token) {
        return res.status(400).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWTSecret);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(400).send({ error: "Please authenticate using a valid token" });
    }

};
module.exports = fetchuser;

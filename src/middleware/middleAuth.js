require('dotenv').config()
const jwt = require('jsonwebtoken')

const response = {
    status: "",
    message: "",
  };
module.exports = async (req, res, next) => {
    if (!req.headers['authorization']) {
        response.status = "failed";
        response.message = "unauthenticated";
        return res.status(401).json(response)
    }
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        if (verify) {
            req.token = token
            req.username = jwt.decode(token, process.env.JWT_SECRET)
            return next()
        }
    } catch (error) {
        response.status = "failed";
        response.message = "invalid token";
        return res.status(500).json(response)
    }
}
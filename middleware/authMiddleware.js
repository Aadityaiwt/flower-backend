const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if(!token) {
            return res.json({
                success: false,
                message: "No token provided",
            });
        }
        const actualToken = token.split(" ")[1]

        const decoded = jwt.verify(actualToken, "secretkey");

        req.user = decoded;
        next()

    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;
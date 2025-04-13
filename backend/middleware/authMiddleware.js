const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token, authorization denied" });

    // Extract token from "Bearer <token>" format
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Assuming you want the user's id from the token
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

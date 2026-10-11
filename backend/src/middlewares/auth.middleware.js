const userModels = require("../models/user.models");
const { JwtSign, JwtVerify } = require("../utils/util");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req?.cookies?.token || req?.headers?.authorization.split(' ')[1];
        if (!token) throw new Error('Token has expired');
        const _data = await JwtVerify(token);
        const user = await userModels.findById(_data._id);
        if (!user) throw new Error("User has no longer available.");
        req._user = _data;
        next()
    } catch (error) {
        // Handle JWT-specific errors explicitly
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid authentication token.' });
        }

        // Fallback for database or server errors
        return res.status(500).json({ message: 'Internal server error during authentication.' })
    }
}

module.exports = { authMiddleware }
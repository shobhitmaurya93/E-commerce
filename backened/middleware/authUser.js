import jwt from 'jsonwebtoken';
import "dotenv/config";

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        req.user = { id: decoded.id };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token verification failed: " + error.message
        });
    }
};

export default authUser;

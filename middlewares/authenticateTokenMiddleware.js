import jwt from "jsonwebtoken";

export const authenticateTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authheader) {
        return res.status(401).send({
            error: "No token provided"
        });
    }

    const token = authheader.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            error: "No token provided"
        });
    }

    jwt.verify(token, "APP_JWT_SECRET", (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: "Invalid token",
                details: err.message,
            });
        }

        req.user = decoded;
        next();
    });
};
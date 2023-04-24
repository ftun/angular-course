const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {

    const tokenHaeder = req.header('Authorization');
    if (!tokenHaeder) {
        return res.status(401).json({
            ok: false,
            msn: 'Unathorized!'
        });
    }

    const bearer = tokenHaeder.split(' ');
    const token = bearer[1];

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        if (uid) {
            req.uid = uid;
            return next();
        }
    } catch (error) {
        console.error('validateJWT', error.message);
        return res.status(500).json({
            ok: false,
            msn: 'Token wrong!'
        });
    }
};

module.exports = {
    validateJWT
};
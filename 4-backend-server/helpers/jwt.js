const jwt = require('jsonwebtoken');

const generateJWT = payload => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h',
        }, (error, token) => {
            if (error) {
                return reject('not generated JWT Token!');
            } else {
                return resolve(token);
            }
        });
    });
};

module.exports = {
    generateJWT,
}
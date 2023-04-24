const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Siempre agregar como ultimo middleware posterior a los express-validator
 */
const InputValidator = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    return next();

};

module.exports = {
    InputValidator,
}
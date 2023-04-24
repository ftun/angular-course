const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { InputValidator } = require('../middlewares/input-validator');

/**
 * Path: /api/login
 */
const router = Router();

router.post('/', [
    check('password', 'password is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    InputValidator,
], login);

module.exports = router;
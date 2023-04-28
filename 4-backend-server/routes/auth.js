const { Router } = require('express');
const { login, googleSignIn, reNewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { InputValidator } = require('../middlewares/input-validator');
// const { googleVerify } = require('../helpers/google-verify');
const { validateJWT } = require('../middlewares/validate-jwt');

/**
 * Path: /api/login
 */
const router = Router();

router.post('/', [
    check('password', 'password is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    InputValidator,
], login);

router.post('/google', [
    check('token', 'token google is required').notEmpty(),
    InputValidator,
], googleSignIn);

router.get('/renew', [
    validateJWT,
    reNewToken,
], googleSignIn);

module.exports = router;